/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { toggleSidebar, toggleUserMenu, } from '../redux/modules/app';
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
          <UserMenu
            in={ !props.app.userMenu.collapsed } 
            key="1"
          />,
        ]
      }
    </div>
  );
};

Header.propTypes = {
  /* Properties */
  app: PropTypes.shape({
    listOfDraftPosts: PropTypes.shape({
      collapsed: PropTypes.bool.isRequired,
    }).isRequired,
    userMenu: PropTypes.shape({
      collapsed: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  userInfo: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),

  /* Actions */
  toggleSidebar: PropTypes.func.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: {
      listOfDraftPosts: {
        collapsed: state.app.listOfDraftPosts.collapsed,
      },
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
