/**
 * External Dependencies
 */
import PropTypes from 'prop-types';

/**
 * A login page that will handle authentication session after logged in.
 * 
 * @param {object} props 
 */
const Login = (props) => {
  if (props.location.hash) {
    props.authService.handleAuthentication()
      .then(() => {
        // Redirect to the previous. 
        // <p>
        // Why reload instead of replace? 
        // Because, the Apollo client requires to setup optional headers  at ../index.js, 
        // in the step before rendering any components.
        window.location = props.authService.getPreviousPathname();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    props.authService.login();
  }

  return null;
};

Login.propTypes = {
  authService: PropTypes.object.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
};

export default Login;
