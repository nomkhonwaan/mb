/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { toggleSidebar } from '../redux/modules/app';
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
          >
            <img className="avatar" alt={ props.userInfo.displayName } src={ props.userInfo.avatarUrl } />
          </div>,
          <UserMenu key="1" />
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

  /* Events */
  toggleSidebar: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  { toggleSidebar, },
)(Header);
