/**
 * External Dependencies
 */
const React = require('react');
const { connect } = require('react-redux');
const { renderRoutes } = require('react-router-config');
const PropTypes = require('prop-types');

/**
 * Internal Dependencies
 */
const Header = require('../components/header');
const Sidebar = require('../components/sidebar');
const routes = require('./routes');

/**
 * The main application.
 *
 * @param {object} props
 */
const App = (props) => {
  return (
    <div className="app">
      <Header />

      <Sidebar />

      { renderRoutes(routes) }
    </div>
  )
}

App.propTypes = {
    app: PropTypes.shape({
      sidebar: PropTypes.shape({
        collapsed: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

module.exports = connect(
  mapStateToProps,
)(App);
