  /**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { TextArea } from '../components/input';
import { updatePostContent } from '../redux/modules/admin-post';

/**
 * A markdown text editor.
 * 
 * @param {object} props 
 */
const MarkdownEditor = (props) => {
  const { id, markdown } = props.adminPost;

  return (
    <div className="markdown-editor">
      <TextArea
        onChange={ (event) => props.updatePostContent(id, event.target.value) }
        value={ markdown }
      />
    </div>
  );
};

MarkdownEditor.propTypes = {
  /* Properties */
  adminPost: PropTypes.shape({
    id: PropTypes.string.isRequired,
    markdown: PropTypes.string,
  }).isRequired,

  /* Actions */
  updatePostContent: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    adminPost: state.adminPost,
  };
}

export default connect(
  mapStateToProps,
  { updatePostContent, },
)(MarkdownEditor);
