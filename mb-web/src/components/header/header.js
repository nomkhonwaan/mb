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
        className="toggle-button _flex _flex-vertical-align-middle"
        onClick={ props.onClickToggleButton }
      >
        <i className="fal fa-bars" />
      </div>
    </div>
  );
};

Header.propTypes = {
  /* Events */
  onClickToggleButton: PropTypes.func,
};

export default Header;
