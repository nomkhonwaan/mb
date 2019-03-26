/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * A HoC for protected component from unauthorized request.
 * 
 * @param {object} props 
 */
const ProtectedRoute = (props) => {
  if (!props.authService.isAuthenticated()) {
    // Redirect to the Auth0 which will store current pathname to the localStorage.
    // The current pathname will be used once the user has been logged in successfully.
    props.authService.login(props.location.pathname);
    
    return null;
  }
  
  return (
    <props.component { ...props } />
  );
};

ProtectedRoute.propTypes = {
  authService: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([ 
    PropTypes.node, 
    PropTypes.func 
  ]).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProtectedRoute;
