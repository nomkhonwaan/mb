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
import ToggleSwitch from '../components/toggle-switch';
import { toggleListOfDraftPosts } from '../redux/modules/app';

/**
 * A user's menu that will appear after logged in.
 * 
 * @param {object} props 
 */
const UserMenu = (props) => {
  return (
    <div className="user-menu">
      <ul className="_list-unstyled">
        <li><Link to="/new-post">Draft a new Post</Link></li>
        <li onClick={ toggleListOfDraftPosts }>
          Display my draft Posts
          <ToggleSwitch on={ !props.app.listOfDraftPosts.collapsed } />
        </li>
        <li className="horizontal-line-separator"></li>
        <li><Link to="/stats">Stats</Link></li>
        <li className="horizontal-line-separator"></li>
        <li><Link to="/me">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </div>
  );
};

UserMenu.propTypes = {
  /* Actions */
  toggleListOfDraftPosts,
};

function mapStateToProps() {
  return {
    app: {
      listOfDraftPosts: {
        collapsed: state.app.listOfDraftPosts.collapsed,
      },
    },
  };
}

export default connect(
  mapStateToProps,
  { toggleListOfDraftPosts, },
)(UserMenu);
