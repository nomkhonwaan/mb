/**
 * External Dependencies
 */
const React = require('react');
const { connect } = require('react-redux');
const { withRouter } = require('react-router-dom');
const PropTypes = require('prop-types');

/**
 * Internal Dependencies
 */
const { toggleSidebar } = require('../../redux/modules/app');

/**
 * An application sidebar component.
 *
 * @param {object} props 
 */
const Sidebar = (props) => {
  return (
    <div className="sidebar">
    </div>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

/**
 * Maps state from Redux store to the Sidebar properties.
 * 
 * @param {object} state 
 */
function mapStateToProps(state) {
  return {};
}

const ConnectedSidebar = connect(
  mapStateToProps, 
  { toggleSidebar, },
)(Sidebar);

module.exports = withRouter(ConnectedSidebar);
