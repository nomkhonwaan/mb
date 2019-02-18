/**
 * External Dependencies
 */
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import Header from './header';
import Sidebar from './sidebar';
import MarkdownEditor from './markdown-editor';
import fragments from './fragments';

/**
 * An administrator Post query.
 */
const adminPostQuery = gql`
  query AdminPostQuery($id: ID!) {
    post(id: $id) {
      ...Post
    }
  }

  ${fragments.post}
`;

/**
 * An administrator Post mutation.
 * <p>
 * This mutation will create a new Post if the Post's ID not provided.
 */
const adminPostMutation = gql`
  mutation CreatePost {
    createPost {
      ...Post
    }
  }

  ${fragments.post}
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
  const { slug } = props.match.params;
  const id = slug ? extractIdFromSlug(slug) : null;

  if (!id) {
    return (
      <Mutation mutation={ adminPostMutation }>
        {
          (createPost, { loading, data }) =>  {
            if (!loading) {
              if (!data) {
                createPost();
              } else {
                const { id, createdAt, } = data.createPost;

                props.history.replace(`/${moment(createdAt).format('YYYY/MM/DD')}/${id}/edit`);
              }
            }

            return null;
          }
        }
      </Mutation>
    );
  }

  return (
    <Query query={ adminPostQuery } variables={ { id } }>
      {
        ({ loading, err, data }) => {
          if (!loading) {
            if (data) {
              return (
                <div className="admin-post">
                  <Sidebar />

                  <Header />

                  <MarkdownEditor id={ id } content={ data.post.markdown } />
                </div>
              );
            }
          }

          return null;
        }
      }
    </Query>
  );
};

AdminPost.propTypes = {
  /* Properties */
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

/**
 * Extracts an ID from the slug string.
 *
 * @param {string} slug 
 */
function extractIdFromSlug(slug) {
  return slug.split('-')[0];
}

export default AdminPost;
