/**
 * External Dependencies
 */
import update from 'immutability-helper';

const TOGGLE_LIST_OF_DRAFT_POSTS = 'TOGGLE_LIST_OF_DRAFT_POSTS';
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';

/**
 * Toggles a list of draft Posts.
 */
export function toggleListOfDraftPosts() {
  return {
    type: TOGGLE_LIST_OF_DRAFT_POSTS,
  };
}

/**
 * Toggles an application sidebar.
 */
export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

/**
 * Toggles a user's  menu.
 */
export function toggleUserMenu() {
  return {
    type: TOGGLE_USER_MENU,
  };
}

const initialState = {
  listOfDraftPosts: { collapsed: true, },
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
  userMenu: { collapsed: true, },
};

/**
 * A reducer of the application module.
 *
 * @param {object} state
 * @param {object} action
 */
function app(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LIST_OF_DRAFT_POSTS:
      return update(state, {
        listOfDraftPosts: {
          $toggle: [ 'collapsed' ],
        },
      });
    case TOGGLE_SIDEBAR:
      return update(state, {
        sidebar: {
          $toggle: ['collapsed'],
        },
      });
    case TOGGLE_USER_MENU:
      return update(state, {
        userMenu: {
          $toggle: ['collapsed'],
        },
      });
    default:
      return state;
  }
}

export default app;
