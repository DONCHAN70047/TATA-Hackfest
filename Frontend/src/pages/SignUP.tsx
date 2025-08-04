import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-900 px-4">
      <div className="relative bg-white/10 backdrop-blur-md text-white p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747545.png"
            alt="Sign Up Icon"
            className="w-10 h-10"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        <form className="space-y-5">
          <div>
            <label className="text-sm block mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
