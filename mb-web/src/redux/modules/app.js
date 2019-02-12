/**
 * External Dependencies
 */
import update from 'immutability-helper';

const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

/**
 * Toggles on/off application sidebar.
 */
export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

const initialState = {
  sidebar: {
    collapsed: true,
    items: [
      {
        link: '/',
        name: 'Home',
      },
      {
        link: '/login',
        name: 'Login / Register',
      },
    ],
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

export default app;
