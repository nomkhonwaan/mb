/**
 * External Dependencies
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * An application sidebar.
 *
 * @param {object} props
 */
const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <header className="header _flex _flex-horizontal-align-right">
        <div
          className="toggle-button _flex _flex-vertical-align-middle"
          onClick={ props.onClickToggleButton }
        >
          <span className="close">Close</span>
          <i className="fal fa-times" />
        </div>
      </header>

      <nav className="nav">
        <ul className="_list-unstyled _unpadding _unmargin">
          {
            props.items
              .filter(({ name }) => !props.isAuthenticated || name !== 'Login / Register')
              .map(({ name, link }, key) => (
                <li
                  className={ classnames('nav-item', {
                    '-selected': props.currentPathname === link,
                  }) }
                  key={ key }
                  onClick={ props.onClickNavItem }
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
  currentPathname: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,

  /* Events */
  onClickNavItem: PropTypes.func,
  onClickToggleButton: PropTypes.func,
};

export default Sidebar;
