/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { MediumPost } from '../components/post';
import Title from '../components/title';
import { fetchLatestPublishedPosts } from '../redux/modules/recent-posts';

/**
 * The recent Posts page.
 * <p>
 * Basically, this is a home page of the application (/).
 */
class RecentPosts extends React.Component {
  componentWillMount() {
    this.props.fetchLatestPublishedPosts();
  }

  render() {
    return (
      <div className="recent-posts _flex _flex-direction-column _flex-horizontal-align-center">
        <Title>Recent Posts</Title>
  
        <div className="_narrow">
          <div className="section-title">Recent Posts</div>

          {
            this.props.recentPosts.latestPublishedPosts.map((post, key) => 
              <MediumPost key={ key } { ...post } />
            )
          }
        </div>
      </div>
    );
  }
};

RecentPosts.propTypes = {
  /* Properties */
  recentPosts: PropTypes.shape({
    latestPublishedPosts: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
  }).isRequired,

  /* Actions */
  fetchLatestPublishedPosts: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    recentPosts: state.recentPosts,
  };
}

export default connect(
  mapStateToProps,
  { fetchLatestPublishedPosts }
)(RecentPosts);
