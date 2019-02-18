/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * An input type text component.
 * 
 * @param {objct} props 
 */
const Text = (props) => {
  return (
    <input
      className={ classnames('input -text', props.className) }
      onChange={ props.onChange }
      type="text"
      value={ props.value }
    />
  );
};

Text.propTypes = {
  /* Properties */
  className: PropTypes.string,
  value: PropTypes.string,

  /* Events */
  onChange: PropTypes.func,
};

export default Text;
