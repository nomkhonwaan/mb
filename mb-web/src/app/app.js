/**
 * External Dependencies
 */
const React = require('react');
const { connect } = require('react-redux');
const { renderRoutes } = require('react-router-config');
const { withRouter } = require('react-router-dom');
const PropTypes = require('prop-types');
const classnames = require('classnames');

/**
 * Internal Dependencies
 */
const Header = require('../components/header');
const PopupOverlay = require('../components/popup-overlay');
const Sidebar = require('../components/sidebar');
const { toggleSidebar } = require('../redux/modules/app');
const routes = require('./routes');

/**
 * The main application.
 *
 * @param {object} props
 */
const App = (props) => {
  return (
    <div className={ classnames('app', {
      '-sidebar-collapsed': props.app.sidebar.collapsed,
    }) }>
      <Sidebar 
        items={ props.app.sidebar.items }
        onClickToggleButton={ props.toggleSidebar } 
        pathname={ props.location.pathname }
      />

      <PopupOverlay
        in={ !props.app.sidebar.collapsed }
        onClickBackground={ props.toggleSidebar }
      />

      <Header onClickToggleButton={ props.toggleSidebar } />

      { renderRoutes(routes) }
    </div>
  )
}

App.propTypes = {
  /* Properties */
  app: PropTypes.shape({
    sidebar: PropTypes.shape({
      collapsed: PropTypes.bool.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

  /* Actions */
  toggleSidebar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

module.exports = withRouter(connect(
  mapStateToProps,
  { toggleSidebar, },
)(App));
