/**
 * External Dependencies
 */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { TextArea } from '../components/input';
import { changePostContent } from '../redux/modules/admin-post';

/**
 * A markdown text editor.
 * 
 * @param {object} props 
 */
const MarkdownEditor = (props) => {
  return (
    <div className="markdown-editor">
      <TextArea onChange={ (event) => 
        props.changePostContent(props.id, event.target.value) } />
    </div>
  );
};

MarkdownEditor.propTypes = {
  /* Properties */
  id: PropTypes.string.isRequired,

  /* Actions */
  changePostContent: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    post: _.find(state.adminPost, { id: ownProps.id }),
  }
}

export default connect(
  mapStateToProps,
  { changePostContent, },
)(MarkdownEditor);
