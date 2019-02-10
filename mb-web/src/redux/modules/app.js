/**
 * External Dependencies
 */
const update = require('immutability-helper');

const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

/**
 * Toggles on/off application sidebar.
 */
function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

const initialState = {
  sidebar: {
    collapsed: true,
  },
};

/**
 * A reducer of the application module.
 *
 * @param {object} state 
 * @param {object} action 
 */
function app(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return update(state, {
        sidebar: {
          $toggle: ['collapsed'],
        },
      });
    default:
      return state;
  }
}

module.exports = app;
module.exports.toggleSidebar = toggleSidebar;
