import React, { useState, useEffect, ReactNode } from 'react';
import { UserContext, User } from '../pages/context/UserContext';

interface Props {
  children: ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const access = sessionStorage.getItem('access_token');
    if (!access) return;

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/current_user/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.username) {
          setUser({ username: data.username, email: data.email }); 
        }
      })
      .catch(err => {
        console.error('❌ Auto-login failed:', err);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;