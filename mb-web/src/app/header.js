/**
 * External Dependencies
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import UserMenu from './user-menu';
import { toggleSidebar, toggleUserMenu } from '../redux/modules/app';

/**
 * An application header.
 * 
 * @param {object} props 
 */
const Header = (props) => {
  return (
    <div className="header _flex">
      <div
        className="toggle-sidebar-button _flex _flex-vertical-align-middle"
        onClick={ props.toggleSidebar }
      >
        <i className="fal fa-bars" />
      </div>

      <div className="toggle-search-dialog-button _flex _flex-vertical-align-middle">
        <i className="fal fa-search" />
      </div>

      {
        _.isEmpty(props.app.userInfo) ? null : [
          <div 
            className="user-info _flex _flex-vertical-align-middle"
            key="0"
            onClick={ props.toggleUserMenu }
          >
            <img className="avatar" alt={ props.app.userInfo.displayName } src={ props.app.userInfo.avatarUrl } />
          </div>,
          <UserMenu key="1" />,
        ]
      }
    </div>
  );
};

Header.propTypes = {
  /* Properties */
  app: PropTypes.shape({
    userInfo: PropTypes.shape({
      avatarUrl: PropTypes.string,
      displayName: PropTypes.string,
    }),
  }).isRequired,
  
  /* Events */
  toggleSidebar: PropTypes.func.isRequired,
  toggleUserMenu: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    app: {
      userInfo: state.app.userInfo,
    },
  };
}

export default connect(
  mapStateToProps,
  { toggleSidebar, toggleUserMenu },
)(Header);
