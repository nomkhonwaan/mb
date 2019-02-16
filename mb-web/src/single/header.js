/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import ToggleSwitch from '../components/toggle-switch';

/**
 * A header of the Post editor.
 *
 * @param {object} props 
 */
const Header = (props) => {
  return (
    <div className="header _flex">
      <div
        className="toggle-mode-button _flex _flex-vertical-align-middle"
      >
        <span className="mode-name">Editor</span>
        <ToggleSwitch />
        <span className="mode-name">Preview</span>
      </div>

      <div className="toggle-responsive-button _flex _flex-vertical-align-middle _flex-horizontal-align-center">
        <div className="_flex _flex-vertical-align-bottom">
          <span className="mobile">
            <i class="fal fa-mobile-android"></i>
          </span>
          <span className="tablet">
            <i class="fal fa-tablet-android"></i>
          </span>
          <span className="desktop -selected">
            <i class="fal fa-desktop"></i>
          </span>
        </div>
      </div>

      <div className="zoom _flex _flex-vertical-align-middle">
        <span className="zoom-percentage">Zoom</span>
      </div>
    </div>
  );
};

export default Header;
