/**
 * External Dependencies
 */
import PropTypes from 'prop-types';

/**
 * The login page.
 * 
 * @param {object} props 
 */
const Login = (props) => {
  if (props.location.hash) {
    props.authService.handleAuthentication()
      .then(() => {
        // Redirect to the previous page. 
        props.history.replace(props.authService.getPreviousPathname());
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
