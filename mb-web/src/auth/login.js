/**
 * External Dependencies
 */
// const React = require('react');
const PropTypes = require('prop-types');
const { withRouter } = require('react-router-dom');

const Login = (props) => {
  if (props.location.hash) {
    props.authService.handleAuthentication()
      .then(() => {
        console.log(props.authService.isAuthenticated());
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    props.authService.login();
  }

  console.log(props.authService.isAuthenticated());
  // props.authService.handleAuthentication()
  //   .catch(() => {
  //     props.authService.login();
  //   });

  return null;
};

Login.propTypes = {
  authService: PropTypes.object.isRequired,
};

module.exports = withRouter(Login);
