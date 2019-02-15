/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import { toggleSidebar, toggleUserMenu } from '../redux/modules/app';
import UserMenu from './user-menu';

/**
 * An application header.
 * 
 * @param {object} props 
 */
const Header = (props) => {
  return (
    <div className="header _flex">
      <div
        className="toggle-sidebar-button _flex _flex-vertical-align-middle"
        onClick={ props.toggleSidebar }
      >
        <i className="fal fa-bars" />
      </div>

      <div className="toggle-search-dialog-button _flex _flex-vertical-align-middle">
        <i className="fal fa-search" />
      </div>

      {
        !props.userInfo ? null : [
          <div 
            className="user-info _flex _flex-vertical-align-middle"
            key="0"
            onClick={ props.toggleUserMenu }
          >
            <img className="avatar" alt={ props.userInfo.displayName } src={ props.userInfo.avatarUrl } />
          </div>,
          <div
            className={ classnames('user-menu', {
              '-user-menu-collapsed': props.app.userMenu.collapsed,
            }) }
            key="1"
          >
            <UserMenu />
          </div>,
        ]
      }
    </div>
  );
};

Header.propTypes = {
  /* Properties */
  userInfo: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  userMenu: PropTypes.shape({
    collapsed: PropTypes.bool.isRequired,
  }),

  /* Actions */
  toggleSidebar: PropTypes.func.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: {
      userMenu: {
        collapsed: state.app.userMenu.collapsed,
      },
    },
  };
}

export default connect(
  mapStateToProps,
  { toggleSidebar, toggleUserMenu, },
)(Header);
