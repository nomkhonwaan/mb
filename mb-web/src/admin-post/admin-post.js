/**
 * External Dependencies
 */
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

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
 * An update Post content mutation.
 */
const updatePostContent = gql`
  mutation UpdatePostContent($input: UpdatePostContentInput!) {
    updatePostContent(input: $input) {
      ...Post
    }

    ${fragments.post}
  }
`;

/**
 * An administrator Post page.
 * <p>
 * In this page, the author can update their Post's fields 
 * such as attachments, content, categories and tags.
 * 
 * @param {object} props 
 */
const AdminPost = (props) => {
  return (
    <div className="admin-post">
      <Sidebar />
    
      <Header />

      <MarkdownEditor />
    </div>
  );
};

export default AdminPost;
