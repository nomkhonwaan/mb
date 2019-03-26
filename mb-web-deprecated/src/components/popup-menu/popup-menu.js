/**
 * External Dependencies
 */
import React from 'react';
import { Transition }  from 'react-transition-group';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * A popup-menu component.
 * 
 * @param {object} props 
 */
const PopupMenu = (props) => {
  return (
    <Transition
      in={ props.in }
      mountOnEnter
      timeout={ props.timeout || 400 }
      unmountOnExit
    >
      {
        (state) => (
          <div className={ classnames('popup-menu', {
            [`-${state}`]: true,
          }) }>
            <ul className="_list-unstyled _unmargin _unpadding">
              {
                props.components.map((component, key) => (
                  <li key={ key }>{ component }</li>
                ))
              }
            </ul>
          </div>
        )
      }
    </Transition>
  );
};

PopupMenu.propTypes = {
  /* Properties */
  in: PropTypes.bool,
  components: PropTypes.oneOfType([ 
    PropTypes.node, 
    PropTypes.func 
  ]).isRequired,
  timeout: PropTypes.number,
};

export default PopupMenu;
