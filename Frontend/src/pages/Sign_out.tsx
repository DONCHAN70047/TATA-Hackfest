import React from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ use 'react-router-dom' in TS

const SignOut: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async (): Promise<void> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blacklist/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          refresh: sessionStorage.getItem('refresh_token'),
        }),
      });

      const result = await response.json();
      console.log('🔒 Sign-out response:', result);

      if (response.ok) {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
      }

      navigate('/');
    } catch (error) {
      console.error('❌ Sign-out failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleSignOut}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition duration-200"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;