/**
 * External Dependencies
 */
import update from 'immutability-helper';
import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';

const FETCH_APP_QUERY = 'FETCH_APP_QUERY';
const FETCH_APP_QUERY_FULFILLED = 'FETCH_APP_QUERY_FULFILLED';
const TOGGLE_LIST_OF_DRAFT_POSTS = 'TOGGLE_LIST_OF_DRAFT_POSTS';
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';

/**
 * Fetches application information.
 */
export function fetchAppQuery() {
  return {
    type: FETCH_APP_QUERY,
  };
}

/**
 * Fetches application information successfully.
 * 
 * @param {array<object>} categories 
 * @param {object} userInfo 
 */
export function fetchAppQueryFulfilled(categories, userInfo) {
  return {
    type: FETCH_APP_QUERY_FULFILLED,
    categories,
    userInfo,
  };
}

/**
 * Performs an API call to the backend.
 * 
 * @param {object} action$ 
 * @param {object} state$ 
 * @param {object} dependencies 
 */
export function fetchAppQueryEpic(action$, state$, dependencies) {
  const { apiClient, authService } = dependencies;
  const query = `
    query AppQuery {
      categories {
        name
        slug
      }
      userInfo {
        avatarUrl
        displayName
      }
    }
  `;
  
  return action$.pipe(
    ofType(FETCH_APP_QUERY),
    mergeMap(() =>
      apiClient
        .do(query, {}, {
          'Authorization': `Bearer ${authService.getAccessToken()}`,
        })
        .pipe(
          map(({ response: { data: { categories, userInfo } } }) =>
            fetchAppQueryFulfilled(categories, userInfo)
          ),
        ),
    ),
  );
}

/**
 * Toggles display list of draft Posts.
 */
export function toggleListOfDraftPosts() {
  return {
    type: TOGGLE_LIST_OF_DRAFT_POSTS,
  };
}

/**
 * Toggles display sidebar.
 */
export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

/**
 * Toggles display user menu.
 */
export function toggleUserMenu() {
  return {
    type: TOGGLE_USER_MENU,
  };
}

const initialState = {
  categories: [],
  listOfDraftPosts: {
    collapsed: true
  },
  sidebar: {
    collapsed: true,
    items: [
      { link: '/', name: 'Home' },
      { link: '/login', name: 'Login / Register' },
    ],
  },
  userInfo: {},
  userMenu: { 
    collapsed: true
  },
};

/**
 * An application reducer.
 *
 * @param {object} state
 * @param {object} action
 */
function app(state = initialState, action) {
  switch (action.type) {
    case FETCH_APP_QUERY_FULFILLED:
      return update(state, {
        categories: {
          $set: action.categories,
        },
        userInfo: {
          $set: action.userInfo,
        },
      });
    case TOGGLE_LIST_OF_DRAFT_POSTS:
      return update(state, {
        listOfDraftPosts: {
          $toggle: [ 'collapsed' ],
        },
      });
    case TOGGLE_SIDEBAR:
      return update(state, {
        sidebar: {
          $toggle: [ 'collapsed' ],
        },
      });
    case TOGGLE_USER_MENU:
      return update(state, {
        userMenu: {
          $toggle: [ 'collapsed' ],
        },
      });
    default:
      return state;
  }
}

export default app;
