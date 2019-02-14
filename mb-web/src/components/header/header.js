/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * An application header component.
 * 
 * @param {object} props 
 */
const Header = (props) => {
  return (
    <div className="header _flex">
      <div
        className="toggle-sidebar-button _flex _flex-vertical-align-middle"
        onClick={ props.onClickToggleButton }
      >
        <i className="fal fa-bars" />
      </div>

      <div className="toggle-search-dialog-button _flex _flex-vertical-align-middle">
        <i className="fal fa-search" />
      </div>
      {
        !props.userInfo ? null : (
          <div className="user-info _flex _flex-vertical-align-middle">
            <img className="avatar" alt={ props.userInfo.displayName } src={ props.userInfo.avatarUrl } />
          </div>
        )
      }
    </div>
  );
};

Header.propTypes = {
  /* Events */
  onClickToggleButton: PropTypes.func,
};

export default Header;
