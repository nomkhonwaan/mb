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
    <ul className="_list-unstyled _unmargin _unpadding">
      <li><Link to="/new-post">Draft a new Post</Link></li>
      <li 
        className="_flex _flex-justify-content-space-between"
        onClick={ props.toggleListOfDraftPosts }
      >
        Display my draft Posts
        <ToggleSwitch checked={ !props.app.listOfDraftPosts.collapsed } />
      </li>
      <li className="horizontal-line-separator"></li>
      <li><Link to="/stats">Stats</Link></li>
      <li className="horizontal-line-separator"></li>
      <li><Link to="/me">Profile</Link></li>
      <li><Link to="/settings">Settings</Link></li>
      <li><Link to="/logout">Logout</Link></li>
    </ul>
  );
};

UserMenu.propTypes = {
  /* Actions */
  toggleListOfDraftPosts: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
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
