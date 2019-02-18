/**
 * External Dependencies
 */
import React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

/**
 * Internal Dependencies
 */
import { TextArea } from '../components/input';
import fragments from './fragments';
import { changePostContent } from '../redux/modules/admin-post';

/**
 * An update Post content mutation.
 */
const updatePostContent = gql`
  mutation UpdatePostContent($input: UpdatePostContentInput!) {
    updatePostContent(input: $input) {
      ...Post
    }
  }

  ${fragments.post}
`;

/**
 * A markdown text editor.
 * 
 * @param {object} props 
 */
const MarkdownEditor = (props) => {
  const { post: { id, markdown } } = props;

  return (
    <Mutation mutation={ updatePostContent }>
      {
        (updatePostContent, { loading, data }) => {
          return (
            <div className="markdown-editor">
              <TextArea
                onChange={ 
                  (event) =>
                    props.changePostContent(id, event.target.value, updatePostContent)
                }
                value={ markdown }
              />
            </div>
          );
        }
      }
    </Mutation>
  );
};

MarkdownEditor.propTypes = {
  /* Properties */
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    markdown: PropTypes.string,
  }).isRequired,

  /* Actions */
  changePostContent: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    post: state.adminPost[ownProps.post.id] || ownProps.post,
  };
}

export default connect(
  mapStateToProps,
  { changePostContent, },
)(MarkdownEditor);
