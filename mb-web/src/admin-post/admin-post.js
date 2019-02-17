/**
 * External Dependencies
 */
import React from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import Header from './header';
import Sidebar from './sidebar';
import MarkdownEditor from './markdown-editor';

/**
 * A reusable fragments.
 */
const fragments = {
  post: gql`
    fragment Post on Post {
      id
      title
      slug
      status
      markdown
      html
      author {
        avatarUrl
        displayName
      }
      categories {
        name
        slug
      }
      publishedAt
      createdAt
      updatedAt
    }
  `,
};

/**
 * A create Post mutation.
 */
const createPost = gql`
  mutation CreatePost {
    createPost {
      ...Post
    }
  }
`;

/**
 * An update Post content mutation.
 */
const updatePostContent = gql`
  mutation UpdatePostContent($input: UpdatePostContentInput!) {
    updatePostContent(input: $input) {
      ...Post
    }
  }
`;

/**
 * An administrator Post mutation.
 * <p>
 * This contains the following these mutations
 * - createPost
 * - updatePostContent
 */
const adminPostMutation = gql`
  # Mutations
  ${createPost}
  ${updatePostContent}

  # Fragments
  ${fragments.post}
`;

console.log(adminPostMutation);

/**
 * An administrator Post page.
 * <p>
 * In this page, the author can update their Post's fields 
 * such as attachments, content, categories and tags.
 * 
 * @param {object} props 
 */
const AdminPost = (props) => {
  // TODO: Find Post by id if `props.id` is exist
  // TODO: Create a new Post if `props.id` is not exist
  return (
    // <Mutation mutation={ adminPostMutation }>
    //   {
    //     (a, b, c) => {
    //       console.log(a, b, c);

    //       return (
            <div className="admin-post">
              <Sidebar />

              <Header />

              <MarkdownEditor id={ props.post.id } content={ props.post.content } />
            </div>
    //       );
    //     }
    //   }
    // </Mutation>
    // <div className="admin-post">
    //   <Sidebar />
    
    //   <Header />

    //   <MarkdownEditor />
    // </div>
  );
};

AdminPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    post: {
      id: '5c5d5d6e6cdce400010c86be',
    },
  };
}

export default connect(
  mapStateToProps,
)(AdminPost);
