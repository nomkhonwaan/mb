/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import ToggleSwitch from '../components/toggle-switch';
import {
  toggleListOfDraftPosts, 
  toggleSidebar, 
  toggleUserMenu,
} from '../redux/modules/app';

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
            <ul className="_list-unstyled _unmargin _unpadding">
              <li>
                <Link to="/new-post">Draft a new Post</Link>
              </li>
              <li 
                className="_flex _flex-justify-content-space-between"
                onClick={ props.toggleListOfDraftPosts }
              >
                Display my draft Posts
                <ToggleSwitch checked={ !props.app.listOfDraftPosts.collapsed } />
              </li>

              <li className="horizontal-line-separator"></li>

              <li>
                <Link to="/stats">Stats</Link>
              </li>

              <li className="horizontal-line-separator"></li>

              <li>
                <Link to="/me">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>,
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
  }).isRequired,
  userInfo: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  userMenu: PropTypes.shape({
    collapsed: PropTypes.bool.isRequired,
  }),

  /* Actions */
  toggleListOfDraftPosts: PropTypes.func.isRequired,
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
  { toggleListOfDraftPosts, toggleSidebar, toggleUserMenu, },
)(Header);
