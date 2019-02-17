/**
 * External Dependencies
 */
import React from'react';
import { Transition } from'react-transition-group';
import PropTypes from'prop-types';
import classnames from'classnames';

/**
 * A popup overlay that blocks user actions and forces the user to make a decision.
 * 
 * @param {object} props 
 */
const PopupOverlay = (props) => {
  return (
    <Transition
      in={ props.in }
      mountOnEnter
      timeout={ props.timeout || 400 }
      unmountOnExit
    >
      {
        (state) => {
          return (
            <div
              className={ classnames('popup-overlay', {
                [`-${state}`]: true,
              }) }
              onClick={ props.onClickBackground }
            >
              { props.children }
            </div>
          );
        }
      }
    </Transition>
  );
};

PopupOverlay.propTypes = {
  /* Properties */
  in: PropTypes.bool.isRequired,
  timeout: PropTypes.number,
  children: PropTypes.node,

  /* Events */
  onClickBackground: PropTypes.func,
};

export default PopupOverlay;
