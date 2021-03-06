/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { Text } from '../components/input';
import ToggleSwitch from '../components/toggle-switch';
import noop from '../noop';

/**
 * A header of the Post editor page.
 *
 * @param {object} props 
 */
const Header = (props) => {
  return (
    <div className="header _flex">
      <div
        className="toggle-mode-button _flex _flex-1 _flex-vertical-align-middle"
      >
        <span className="mode-name">Editor</span>
        <ToggleSwitch />
        <span className="mode-name">Preview</span>
      </div>

      <div className="toggle-responsive-button _flex _flex-horizontal-align-center _flex-vertical-align-middle _margin-auto">
        <div className="_flex _flex-vertical-align-bottom">
          <span className="mobile">
            <i className="fal fa-mobile-android"></i>
          </span>
          <span className="tablet">
            <i className="fal fa-tablet-android"></i>
          </span>
          <span className="desktop -selected">
            <i className="fal fa-desktop"></i>
          </span>
        </div>
      </div>

      <div className="zoom _flex _flex-1 _flex-horizontal-align-right _flex-vertical-align-middle">
        <span className="zoom-label">Zoom</span>
        <span className="zoom-percentage">
          <Text
            className="_text-align-center"
            onChange={ noop }
            value="80%"
          />
        </span>
      </div>
    </div>
  );
};

export default Header;
