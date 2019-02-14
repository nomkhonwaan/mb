import React from 'react';

const ProtectedRoute = (props) => {
  if (!props.authService.isAuthenticated()) {
    props.history.replace('/login');
    
    return null;
  }
  
  return (
    <props.component { ...props } />
  );
};

export default ProtectedRoute;
