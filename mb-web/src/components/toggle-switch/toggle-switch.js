/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * A toggle switch component.
 * 
 * @param {object} props 
 */
const ToggleSwitch = (props) => {
  return (
    <div className="toggle-switch">
      <input
        checked={ !!props.checked }
        onChange={ props.onChange }
        type="checkbox"
      />
      <label />
    </div>
  );
};

ToggleSwitch.propTypes = {
  /* Properties */
  checked: PropTypes.bool,

  /* Events */
  onChange: PropTypes.func,
};

export default ToggleSwitch;
