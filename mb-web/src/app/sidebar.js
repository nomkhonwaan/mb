/**
 * External Dependencies
 */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import { toggleSidebar } from '../redux/modules/app';

/**
 * An application sidebar component.
 *
 * @param {object} props
 */
const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <header className="header _flex _flex-horizontal-align-right">
        <div
          className="toggle-button _flex _flex-vertical-align-middle"
          onClick={ props.toggleSidebar }
        >
          <span className="close">Close</span>
          <i className="fal fa-times" />
        </div>
      </header>

      <nav>
        <ul className="_list-unstyled _unpadding _unmargin">
          {
            props.items
              .filter(({ name }) => !props.authService.isAuthenticated() || name !== 'Login / Register')
              .map(({ name, link }, key) => (
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
  /* Properties */
  authService: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

  /* Events */
  toggleSidebar: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  { toggleSidebar, },
)(Sidebar));
