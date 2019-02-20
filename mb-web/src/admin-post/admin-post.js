// import AdminPost from ".";

// /**
//  * External Dependencies
//  */
// import React from 'react';
// import { Mutation, Query } from 'react-apollo';
// import gql from 'graphql-tag';
// import moment from 'moment';
// import PropTypes from 'prop-types';

// /**
//  * Internal Dependencies
//  */
// import Header from './header';
// import Sidebar from './sidebar';
// import fragments from './fragments';
// import MarkdownEditor from './markdown-editor';

// /**
//  * An administrator Post query.
//  */
// const adminPostQuery = gql`
//   query AdminPostQuery($id: ID!) {
//     post(id: $id) {
//       ...Post
//     }
//   }

//   ${fragments.post}
// `;

// /**
//  * An administrator Post mutation.
//  * <p>
//  * This mutation will create a new Post if the Post's ID not provided.
//  */
// const adminPostMutation = gql`
//   mutation CreatePost {
//     createPost {
//       ...Post
//     }
//   }

//   ${fragments.post}
// `;

// /**
//  * An administrator Post page.
//  * <p>
//  * In this page, the author can update their Post's fields 
//  * such as attachments, content, categories and tags.
//  * 
//  * @param {object} props 
//  */
// const AdminPost = (props) => {
//   const { slug } = props.match.params;
//   const id = slug ? extractIdFromSlug(slug) : null;

//   if (!id) {
//     return (
//       <Mutation mutation={ adminPostMutation }>
//         {
//           (createPost, { loading, data }) =>  {
//             if (!loading) {
//               if (!data) {
//                 createPost();
//               } else {
//                 const { id, createdAt, } = data.createPost;

//                 props.history.replace(`/${moment(createdAt).format('YYYY/MM/DD')}/${id}/edit`);
//               }
//             }

//             return null;
//           }
//         }
//       </Mutation>
//     );
//   }

//   return (
//     <Query query={ adminPostQuery } variables={ { id } }>
//       {
//         ({ loading, err, data }) => {
//           if (!loading) {
//             if (data) {
//               return (
//                 <div className="admin-post">
//                   <Sidebar />

//                   <Header />

//                   <MarkdownEditor post={ { id, markdown: data.post.markdown } } />
//                 </div>
//               );
//             }
//           }

//           return null;
//         }
//       }
//     </Query>
//   );
// };

// AdminPost.propTypes = {
//   /* Properties */
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       slug: PropTypes.string,
//     }).isRequired,
//   }).isRequired,
// };

// /**
//  * Extracts an ID from the slug string.
//  *
//  * @param {string} slug 
//  */
// function extractIdFromSlug(slug) {
//   return slug.split('-')[0];
// }

// export default AdminPost;

/**
 * External Dependencies
 */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import Header from './header';
import MarkdownEditor from './markdown-editor';
import Sidebar from './sidebar';

import { createPost, editPost } from '../redux/modules/admin-post';

class AdminPost extends React.Component {
  componentWillMount() {
    if (_.isEmpty(this.props.adminPost)) {
      this.props.createPost();
    } else {
      this.props.editPost(this.props.adminPost.id);
    }
  }

  componentDidUpdate(prevProps) {
    // If an `adminPost` in the previous props is empty but the current one is not, 
    // that means the Post just created in the `componentWillMount` state.
    // So, redirect to edit page for preventing duplicated creation.
    if (_.isEmpty(prevProps.adminPost) && !_.isEmpty(this.props.adminPost)) {
      const { id, createdAt } = this.props.adminPost;

      this.props.history.replace(`/${moment(createdAt).format('YYYY/MM/DD')}/${id}/edit`);
    }
  }

  render() {
    if (!this.props.adminPost.status) {
      return null;
    }

    return (
      <div className="admin-post">
        <Sidebar />

        <Header />

        <MarkdownEditor />
      </div>
    );
  }
}

AdminPost.propTypes = {
  /* Properties */
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }).isRequired
  }).isRequired,

  /* Actions */
  createPost: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  const { slug } = ownProps.match.params;
  const id = slug ? /(.*-)?(.*)$/.exec(slug)[2] : null;

  return {
    adminPost: _.isEmpty(state.adminPost) 
      ? id 
          ? { id } 
          : null 
      : state.adminPost,
  };
}

export default withRouter(connect(
  mapStateToProps,
  { createPost, editPost },
)(AdminPost));