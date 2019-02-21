/**
 * External Dependencies
 */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

/**
 * Internal Dependencies
 */
import PopupMenu from '../popup-menu';

/**
 * A button that contains menu or list of actions.
 */
class ButtonGroup extends React.Component {
  state = {
    popupMenu: {
      collapsed: true,
    },
  };
  
  constructor() {
    super();

    this.onTogglePopupMenu = this.onTogglePopupMenu.bind(this);
  }
  
  onTogglePopupMenu() {
    this.setState(update(this.state, {
      popupMenu: {
        $toggle: [ 'collapsed' ],
      },
    }));
  }
  
  render() {
    return (
      <button
        className={ classnames('button', '-group', {
          '-popup-menu-collapsed': this.state.popupMenu.collapsed,
          '-primary': this.props.primary,
        }) }
        
        onClick={ this.onTogglePopupMenu }
      >
        { this.props.children }
        <i className="fal fa-angle-down" />
        { this.renderPopupMenu() }
      </button>
    );
  }
  
  renderPopupMenu() {
    return (
      <PopupMenu
        in={ !this.state.popupMenu.collapsed }
        timeout={ 400 }
        components={ this.props.components }
      />
    );
  }
}

ButtonGroup.propTypes = {
  /* Properties */
  children: PropTypes.string,
  components: PropTypes.oneOfType([ 
    PropTypes.node, 
    PropTypes.func 
  ]).isRequired,
  primary: PropTypes.bool,
};

export default ButtonGroup;
