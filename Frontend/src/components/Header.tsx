import React, { useState, useContext, useEffect } from 'react';
import { Shield, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../pages/context/UserContext'; 

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Safe context access
  const context = useContext(UserContext);
  if (!context) throw new Error('UserContext must be used within a UserProvider');
  const { user, setUser } = context;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    const storedUser = sessionStorage.getItem('user');
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.username) {
          setUser(parsedUser);
        }
      } catch (err) {
        console.error('Failed to parse user from sessionStorage:', err);
      }
    }
  }, [setUser]);

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-black shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">InsurancePro</h1>
              <p className="text-sm text-gray-300">Customer Services</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-200 hover:text-primary-400 font-medium transition-colors">
              Services
            </a>
            <a href="#upload" className="text-gray-200 hover:text-primary-400 font-medium transition-colors">
              Upload Documents
            </a>
            <a href="#ai-chat" className="text-gray-200 hover:text-primary-400 font-medium transition-colors">
              AI Assistant
            </a>
            <a href="#contact" className="text-gray-200 hover:text-primary-400 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-6 ml-6">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Phone className="w-4 h-4" />
              <span>1-800-INSURANCE</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Mail className="w-4 h-4" />
              <span>support@insurancepro.com</span>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            {user ? (
              <>
                <span className="text-sm text-gray-300">Hi, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 rounded-md border border-red-500 text-red-500 font-medium hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-md border border-primary-600 text-primary-600 font-medium hover:bg-primary-600 hover:text-white transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="text-gray-200 hover:text-primary-400 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <nav className="flex flex-col space-y-4 p-4">
            <a href="#services" className="text-gray-200 hover:text-primary-400 font-medium">
              Services
            </a>
            <a href="#upload" className="text-gray-200 hover:text-primary-400 font-medium">
              Upload Documents
            </a>
            <a href="#ai-chat" className="text-gray-200 hover:text-primary-400 font-medium">
              AI Assistant
            </a>
            <a href="#contact" className="text-gray-200 hover:text-primary-400 font-medium">
              Contact
            </a>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-white border border-red-500 px-4 py-2 rounded-md text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-primary-600 hover:text-white border border-primary-600 px-4 py-2 rounded-md text-center"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;