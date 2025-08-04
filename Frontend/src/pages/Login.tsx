import React from 'react';
import { Link } from 'react-router-dom';



const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 py-12 relative">
      
      {/* Back to Home Button in top-right */}
      <div className="absolute top-4 right-4 z-10">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-sm transition duration-200"
        >
          ⬅ Back to Home
        </Link>
      </div>

      {/* Login Form Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10">
        
        {/* User Icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="User Icon"
            className="w-10 h-10"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-white text-center mb-6 tracking-tight">
          Welcome Back
        </h2>

        {/* Login Form */}
        <form className="space-y-5">
          <div>
            <label className="text-sm text-white block mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm text-white block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
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
