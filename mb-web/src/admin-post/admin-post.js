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
import Title from '../components/title';
import Header from './header';
import MarkdownEditor from './markdown-editor';
import Sidebar from './sidebar';
import { createPost, startEditingPost } from '../redux/modules/admin-post';

/**
 * The Post editor page.
 */
class AdminPost extends React.Component {
  componentWillMount() {
    if (_.isEmpty(this.props.adminPost)) {
      this.props.createPost();
    } else {
      this.props.startEditingPost(this.props.adminPost.id);
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
        <Title>
          {
            _.isEmpty(this.props.adminPost)
              ? 'Draft a new Post'
              : `Editing ${this.props.adminPost.title}`
          }
        </Title>

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
  startEditingPost: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  const { slug } = ownProps.match.params;
  const id = slug ? /(.*-)?(.*)$/.exec(slug)[2] : null;

  return {
    adminPost: _.isEmpty(state.adminPost) 
      ? id 
          ? { id } 
          : {}
      : state.adminPost,
  };
}

export default withRouter(connect(
  mapStateToProps,
  { createPost, startEditingPost },
)(AdminPost));