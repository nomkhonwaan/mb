/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import noop from '../../noop';

/**
 * A toggle switch component.
 * 
 * @param {object} props 
 */
const ToggleSwitch = (props) => {
  return (
    <div className="toggle-switch">
      <input type="checkbox" checked={ !!props.checked } onChange={ noop } />
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
