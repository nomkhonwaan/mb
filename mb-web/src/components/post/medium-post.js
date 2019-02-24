/**
 * External Dependencies
 */
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * A medium size of the Post.
 * <p>
 * Basically, this component will be rendered on home and archive pages.
 * 
 * @param {object} props 
 */
const MediumPost = (props) => {
  return (
    <div className="medium-post">
      <h2 className="title">{ props.title }</h2>

      <p
        className="content" 
        dangerouslySetInnerHTML={ { __html: /<p>(.+?)<\/p>/.exec(props.html)[1] } }
      />

      <div className="metadata">
        <img
          alt={ props.author.displayName } 
          className="author-avatar"
          src={ props.author.avatarUrl } 
        />
        <div className="author-display-name">{ props.author.displayName }</div>
        <time 
          className="published-at"
          dateTime={ props.publishedAt }
        >
          { moment(props.publishedAt).format('LL') }
        </time>
        on 
        <div className="categories">
          {
            props.categories.map((category, key) => 
              <Link key={ key } to={ `/categories/${category.slug}` }>{ category.name }</Link>
            )
          }
        </div>
      </div>
    </div>
  )
};

MediumPost.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MediumPost;
