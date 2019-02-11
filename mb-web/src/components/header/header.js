/**
 * External Dependencies
 */
const React = require('react');
const { connect } = require('react-redux');
const PropTypes = require('prop-types');

/**
 * Internal Dependencies
 */
const { toggleSidebar } = require('../../redux/modules/app');

const Header = (props) => {
  return (
    <div className="header">
    </div>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {};
}

module.exports = connect(
  mapStateToProps,
  { toggleSidebar },
)(Header);
