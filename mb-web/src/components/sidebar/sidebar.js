/**
 * External Dependencies
 */
const React = require('react');
const PropTypes = require('prop-types');

const Sidebar = (props) => {
  return (
    <div className="sidebar">
    </div>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.boolean.isRequired,
};

module.exports = Sidebar;
