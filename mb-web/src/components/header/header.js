/**
 * External Dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');

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

module.exports = Header;
