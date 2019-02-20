/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { Button } from '../components/button';

/**
 * A sidbar of the Post editor.
 * 
 * @param {object} props 
 */
const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <header className="header _flex _flex-horizontal-align-right">
        <div
          className="toggle-button _flex _flex-vertical-align-middle"
        >
          <span className="close">Close</span>
          <i className="fal fa-times" />
        </div>
      </header>

      <div className="post-status">
        <Button>
          Published
        </Button>
      </div>

      <div className="post-categories"></div>

      <div className="post-tags"></div>

      <div className="post-attachments"></div>
    </div>
  );
};

export default Sidebar;
