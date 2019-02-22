/**
 * External Dependencies
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import UserMenu from './user-menu';
import { 
  fetchUserInfo, 
  toggleSidebar, 
  toggleUserMenu,
} from '../redux/modules/app';

/**
 * An application header.
 * 
 * @param {object} props 
 */
class Header extends React.Component {
  componentWillMount() {
    if (this.props.authService.isAuthenticated()) {
      this.props.fetchUserInfo();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.authService.isAuthenticated()) {
      // If the user has been redirected back from /login page,
      // Will fetch an application query for the list of categories and user information
      if (_.isEmpty(this.props.app.userInfo)) {
        this.props.fetchUserInfo();
      }
    }
  }

  render() {
    return (
      <div className="header _flex">
        <div
          className="toggle-sidebar-button _flex _flex-vertical-align-middle"
          onClick={ this.props.toggleSidebar }
        >
          <i className="fal fa-bars" />
        </div>

        <div className="toggle-search-dialog-button _flex _flex-vertical-align-middle">
          <i className="fal fa-search" />
        </div>

        {
          _.isEmpty(this.props.app.userInfo) ? null : [
            <div 
              className="user-info _flex _flex-vertical-align-middle"
              key="0"
              onClick={ this.props.toggleUserMenu }
            >
              <img className="avatar" alt={ this.props.app.userInfo.displayName } src={ this.props.app.userInfo.avatarUrl } />
            </div>,
            <UserMenu key="1" />,
          ]
        }
      </div>
    );
  }
}

Header.propTypes = {
  /* Properties */
  app: PropTypes.shape({
    userInfo: PropTypes.shape({
      avatarUrl: PropTypes.string,
      displayName: PropTypes.string,
    }),
  }).isRequired,
  
  /* Events */
  fetchUserInfo: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: {
      userInfo: state.app.userInfo,
    },
  };
}

export default connect(
  mapStateToProps,
  { fetchUserInfo, toggleSidebar, toggleUserMenu },
)(Header);
