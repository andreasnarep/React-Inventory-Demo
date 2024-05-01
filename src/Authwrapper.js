import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; // Import Firebase authentication instance

const AuthWrapper = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Loading indicator if authentication state is still loading
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default AuthWrapper;