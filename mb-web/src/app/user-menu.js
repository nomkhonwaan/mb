/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import ToggleSwitch from '../components/toggle-switch';
import { toggleListOfDraftPosts, toggleUserMenu } from '../redux/modules/app';

/**
 * A user's menu that will appear after logged in.
 * 
 * @param {object} props 
 */
const UserMenu = (props) => {
  return (
    <Transition
      in={ props.in }
      mountOnEnter
      timeout={ props.timeout || 400 }
      unmountOnExit
    >
      {
        (status) => {
          return (
            <div className={ classnames('user-menu', {
              [`-${status}`]: true,
            }) }>
              <ul className="_list-unstyled _unmargin _unpadding">
                { renderItems(props.app.userMenu.items.slice(0, 1), props.toggleUserMenu) }

                <li 
                    className="_flex _flex-justify-content-space-between _flex-vertical-align-middle"
                    onClick={ props.toggleListOfDraftPosts }
                >
                    Display my draft Posts
                    <ToggleSwitch checked={ !props.app.listOfDraftPosts.collapsed } />
                </li>
                
                <li className="horizontal-line-separator"></li>

                { renderItems(props.app.userMenu.items.slice(1, 2), props.toggleUserMenu) }

                <li className="horizontal-line-separator"></li>

                { renderItems(props.app.userMenu.items.slice(2, 5), props.toggleUserMenu) }
              </ul>
            </div>
          );
        }
      }
    </Transition>
  );
};

/**
 * Renders a list of items on the user's menu.
 * 
 * @param {array<object>} items 
 * @param {function} onClickItem 
 */
function renderItems(items, onClickItem) {
  return items.map(({ link, name }, key) => (
    <li key={ key } onClick={ onClickItem }>
      <Link to={ link }>{ name }</Link>
    </li>
  ));
}

UserMenu.propTypes = {
  /* Properties */
  in: PropTypes.bool.isRequired,
  app: PropTypes.shape({
    listOfDraftPosts: PropTypes.shape({
      collapsed: PropTypes.bool.isRequired,
    }).isRequired,
    userMenu: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,

  /* Actions */
  toggleListOfDraftPosts: PropTypes.func.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: {
      listOfDraftPosts: {
        collapsed: state.app.listOfDraftPosts.collapsed,
      },
      userMenu: {
        items: state.app.userMenu.items,
      }
    },
  };
}

export default connect(
  mapStateToProps,
  { toggleListOfDraftPosts, toggleUserMenu },
)(UserMenu);