/**
 * External Dependencies
 */
import React from 'react';

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
    </div>
  );
};

export default Sidebar;
