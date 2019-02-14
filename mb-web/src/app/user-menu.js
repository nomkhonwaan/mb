/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */

/**
 * A user's menu that will appear after logged in.
 * 
 * @param {object} props 
 */
const UserMenu = (props) => {
  return (
    <div className="user-menu">
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
)(UserMenu);
