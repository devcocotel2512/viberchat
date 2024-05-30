import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('authToken');
    console.log('AuthProvider: Token in localStorage:', token); // Debugging log

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
console.log(AuthContext);
export const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider };