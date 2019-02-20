/**
 * External Dependencies
 */
import _ from 'lodash';
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
import { fetchAppQuery, toggleSidebar, toggleUserMenu } from '../redux/modules/app';
import routes from './routes';

/**
 * The main application.
 *
 * @param {object} props
 */
class App extends React.Component {
  componentWillMount() {
    if (this.props.authService.isAuthenticated()) {
      this.props.fetchAppQuery();
    }
  }

  componentDidUpdate() {
    if (this.props.authService.isAuthenticated()) {
      // If the user has been redirected back from /login page,
      // Will fetch an application query for the list of categories and user information
      if (_.isEmpty(this.props.app.userInfo)) {
        this.props.fetchAppQuery();
      }
    }
  }

  render() {
    return (
      <div className={ classnames('app', {
        '-sidebar-collapsed': this.props.app.sidebar.collapsed,
      }) }>
        <Sidebar authService={ this.props.authService } />
  
        <PopupOverlay
          in={ !this.props.app.sidebar.collapsed }
          onClickBackground={ this.props.toggleSidebar }
        />
  
        <Header />
  
        { renderRoutes(routes, { authService: this.props.authService }) }
      </div>
    );
  }
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
  authService: PropTypes.object.isRequired,
  
  /* Actions */
  fetchAppQuery: PropTypes.func.isRequired,
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
  { fetchAppQuery, toggleSidebar, toggleUserMenu },
)(App));
