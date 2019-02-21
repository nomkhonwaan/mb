/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { ButtonGroup } from '../components/button';
import { HorizontalSeparator } from '../components/popup-menu';

/**
 * A sidbar of the Post editor.
 * 
 * @param {object} props 
 */
const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <header className="header _flex _flex-horizontal-align-right">
        <div
          className="toggle-button _flex _flex-vertical-align-middle"
        >
          <span className="close">Close</span>
          <i className="fal fa-times" />
        </div>
      </header>

      <div className="status">
        <ButtonGroup
          components={ [
            <span>Draft</span>,
            <span>Published</span>,
            <HorizontalSeparator />,
            <span className="_text-color-red">Delete</span>
          ] }
          primary
        >
          { props.adminPost.status }
        </ButtonGroup>
      </div>

      <div className="categories"></div>

      <div className="tags"></div>

      <div className="attachments"></div>
    </div>
  );
};

Sidebar.propTypes = {
  adminPost: PropTypes.shape({
    status: PropTypes.oneOf([
      'DRAFT',
      'PUBLISHED',
    ]).isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    adminPost: state.adminPost,
  };
}

export default connect(
  mapStateToProps
)(Sidebar);
