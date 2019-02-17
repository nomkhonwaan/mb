/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import PopupMenu, { HorizontalSeparator } from '../components/popup-menu';
import ToggleSwitch from '../components/toggle-switch';
import { toggleListOfDraftPosts, toggleUserMenu } from '../redux/modules/app';

/**
 * A user's menu that will appear after logged in.
 * 
 * @param {object} props 
 */
const UserMenu = (props) => {
  return (
    <div className="user-menu">
      <PopupMenu
        in={ !props.app.userMenu.collapsed }
        timeout={ 400 }
        components={ [
          <Link to="/new-post">Draft a new Post</Link>,
          <span 
            className="_flex _flex-justify-content-space-between _flex-vertical-align-middle"
            onClick={ props.toggleListOfDraftPosts }>
            <span>Display my draft Posts</span>
            <ToggleSwitch checked={ !props.app.listOfDraftPosts.collapsed } />
          </span>,
          <HorizontalSeparator />,
          <Link to="/stats">Stats</Link>,
          <HorizontalSeparator />,
          <Link to="/me">Profile</Link>,
          <Link to="/settings">Settings</Link>,
          <Link to="/logout">Logout</Link>,
        ] }
      />
    </div>
  );
};

UserMenu.propTypes = {
  /* Properties */
  app: PropTypes.shape({
    listOfDraftPosts: PropTypes.shape({
      collapsed: PropTypes.bool.isRequired,
    }).isRequired,
    userMenu: PropTypes.shape({
      collapsed: PropTypes.bool.isRequired,
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
      userMenu: state.app.userMenu,
    },
  };
}

export default connect(
  mapStateToProps,
  { toggleListOfDraftPosts, toggleUserMenu },
)(UserMenu);