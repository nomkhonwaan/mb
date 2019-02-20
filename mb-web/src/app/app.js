/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import PopupOverlay from '../components/popup-overlay';
import Header from './header';
import Sidebar from './sidebar';
import { fetchUserInfo, toggleSidebar, toggleUserMenu } from '../redux/modules/app';
import routes from './routes';

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
      <Sidebar authService={ props.authService } />

      <PopupOverlay
        in={ !props.app.sidebar.collapsed }
        onClickBackground={ props.toggleSidebar }
      />

      <Header authService={ props.authService } />

      { renderRoutes(routes, { authService: props.authService }) }
    </div>
  );
};

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
  authService: PropTypes.object.isRequired,
  
  /* Actions */
  fetchUserInfo: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default withRouter(connect(
  mapStateToProps,
  { fetchUserInfo, toggleSidebar, toggleUserMenu },
)(App));
