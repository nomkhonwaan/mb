/**
 * External Dependencies
 */
const React = require('react');
const { Transition } = require('react-transition-group');
const PropTypes = require('prop-types');
const classnames = require('classnames');

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
        (status) => {
          const classes = {}
          classes[`-${status}`] = true;

          return (
            <div
              className={ classnames('popup-overlay', classes) }
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

module.exports = PopupOverlay;
