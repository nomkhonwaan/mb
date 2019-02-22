/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import Title from '../components/title';

/**
 * The recent Posts page.
 * <p>
 * Basically, this is a home page of the application (/).
 * 
 * @param {object} props 
 */
const RecentPosts = (props) => {
  return (
    <div className="recent-posts _flex _flex-direction-column _flex-horizontal-align-center">
      <Title>Recent Posts</Title>

      <div className="_narrow">
        <div className="section-title">Recent Posts</div>
      </div>
    </div>
  );
};

export default RecentPosts;
