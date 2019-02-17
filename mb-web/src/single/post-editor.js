/**
 * External Dependencies
 */
import React from 'react';
import queryString from 'query-string';

/**
 * Internal Dependencies
 */
import Header from './header';
import Sidebar from './sidebar';

/**
 * A Post editor page. 
 * 
 * @param {object} props 
 */
const PostEditor = (props) => {
  const params = queryString.parse(props.location.search);

  return (
    <div className="post-editor">
      <Sidebar />

      <Header />

      <div className="markdown-editor">
      </div>

      <div className="html-preview">
      </div>
    </div>
  );
};


/**
 * Detects LIFF mode from query params.
 * 
 * @param {object} params 
 */
function isLIFF(params) {
  return params.mode && params.mode.toLowerCase() === 'liff';
}


export default PostEditor;
