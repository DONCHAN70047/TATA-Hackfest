import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext'; // ✅ Adjust path if needed
import type { UserContextType } from './context/UserContext'; // ✅ Import type

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Safe context access
  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext must be used within a UserProvider');
  const { setUser } = context as UserContextType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/log_in/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');

      console.log('✅ Login Success:', data);

      // Store tokens
      sessionStorage.setItem('access_token', data.access);
      sessionStorage.setItem('refresh_token', data.refresh);

      // Fetch current user
      const userRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/current_user/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.access}`,
        },
      });

      const userData = await userRes.json();
      if (!userRes.ok) throw new Error('Failed to fetch user');

      // Store user and update context
      sessionStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      alert('🎉 Logged in successfully!');
      navigate('/');
    } catch (err: any) {
      console.error('❌ Login error:', err.message);
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-12 relative">
      <div className="absolute top-4 right-4 z-10">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-sm transition duration-200"
        >
          ⬅ Back to Home
        </Link>
      </div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="User Icon"
            className="w-10 h-10"
          />
        </div>

        <h2 className="text-2xl font-extrabold text-white text-center mb-6 tracking-tight">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-white block mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm text-white block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-sm text-white text-center mt-6">
          Don’t have an account?{' '}
          <Link to="/SignUP" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;