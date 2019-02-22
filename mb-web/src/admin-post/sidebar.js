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
import { updatePostStatus } from '../redux/modules/admin-post';

/**
 * A sidebar of the Post editor page.
 * 
 * @param {object} props 
 */
const Sidebar = (props) => {
  const { id, status } = props.adminPost;

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
            <span onClick={ () => props.updatePostStatus(id, 'DRAFT') }>Draft</span>,
            <span onClick={ () => props.updatePostStatus(id, 'PUBLISHED') }>Published</span>,
            <HorizontalSeparator />,
            <span className="_text-danger">Delete</span>
          ] }
          primary
        >
          { status }
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
  mapStateToProps,
  { updatePostStatus },
)(Sidebar);
