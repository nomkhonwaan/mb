/**
 * External Dependencies
 */
import PropTypes from 'prop-types';

const Login = (props) => {
  if (props.location.hash) {
    props.authService.handleAuthentication()
      .then(() => {
        // TODO: Ridirect user to the previous page
        console.log(props.authService.isAuthenticated());
      })
      .catch((err) => {
        // TODO: Display error page, popup message or anything
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
