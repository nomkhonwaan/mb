/**
 * External Dependencies
 */
const React = require('react');
const { connect } = require('react-redux');
const { withRouter } = require('react-router-dom');
const { Link } = require('react-router-dom');
const PropTypes = require('prop-types');
const classnames = require('classnames');

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
      <header className="header _flex">
        <a
          className="toggle-button"
          href="#"
          onClick={ props.toggleSidebar }
        >
          <span className="close">Close</span>
          <i className="fal fa-times" />
        </a>
      </header>

      <nav>
        <ul className="_list-unstyled _unpadding _unmargin">
          {
            props.app.sidebar.items.map(({ name, link }, key) => (
              <li
                className={ classnames('nav-item', {
                  '-selected': props.location.pathname === link,
                }) }
                key={ key }
                onClick={ props.toggleSidebar }
              >
                <Link to={ link } className="_color-inherit _text-undecorated">
                  { name }
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  app: PropTypes.shape({
    sidebar: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          link: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: {
      sidebar: {
        items: state.app.sidebar.items,
      },
    },
  };
}

module.exports = withRouter(
  connect(
    mapStateToProps,
    { toggleSidebar },
  )(Sidebar),
);
