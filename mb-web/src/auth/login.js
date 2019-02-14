/**
 * External Dependencies
 */
import PropTypes from 'prop-types';

const Login = (props) => {
  if (props.location.hash) {
    props.authService.handleAuthentication()
      .then(() => {
        props.authService.redirectIntended();
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
