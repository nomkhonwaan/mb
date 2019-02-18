/**
 * External Dependencies
 */
import gql from 'graphql-tag';

/**
 * A list of Post fragments.
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

export default fragments;
