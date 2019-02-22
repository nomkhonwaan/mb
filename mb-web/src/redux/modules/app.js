/**
 * External Dependencies
 */
import update from 'immutability-helper';
import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';

const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const FETCH_CATEGORIES_FULFILLED = 'FETCH_CATEGORIES_FULFILLED';

const FETCH_USER_INFO = 'FETCH_USER_INFO';
const FETCH_USER_INFO_FULFILLED = 'FETCH_USER_INFO_FULFILLED';

const TOGGLE_LIST_OF_DRAFT_POSTS = 'TOGGLE_LIST_OF_DRAFT_POSTS';

const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU';

/**
 * Fetches list of categories.
 */
export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES,
  };
}

/**
 * Fetches list of categories successfully.
 * 
 * @param {array<object} categories 
 */
export function fetchCategoriesFulfilled(categories) {
  return {
    type: FETCH_CATEGORIES_FULFILLED,
    categories,
  };
}

/**
 * Performs an API call to the backend.
 * 
 * @param {object} action$ 
 * @param {object} state$ 
 * @param {object} dependencies 
 */
export function fetchCategoriesEpic(action$, state$, dependencies) {
  const { apiClient } = dependencies;
  const query = `
    query FetchCategories {
      categories {
        name
        slug
      }
    }
  `;

  return action$.pipe(
    ofType(FETCH_CATEGORIES),
    mergeMap(() =>
      apiClient
        .do(query)
        .pipe(
          map(({ response: { data: { categories } } }) =>
            fetchCategoriesFulfilled(categories),
          ),
        ),
    ),
  );
}

/**
 * Fetches user information.
 */
export function fetchUserInfo() {
  return {
    type: FETCH_USER_INFO,
  };
}

/**
 * Fetches user information successfully.
 * 
 * @param {object} userInfo 
 */
export function fetchUserInfoFulfilled(userInfo) {
  return {
    type: FETCH_USER_INFO_FULFILLED,
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
export function fetchUserInfoEpic(action$, state$, dependencies) {
  const { apiClient, authService } = dependencies;
  const query = `
    query FetchUserInfo {
      userInfo {
        avatarUrl
        displayName
      }
    }
  `;
  
  return action$.pipe(
    ofType(FETCH_USER_INFO),
    mergeMap(() =>
      apiClient
        .do(query, {}, {
          'Authorization': `Bearer ${authService.getAccessToken()}`,
        })
        .pipe(
          map(({ response: { data: { userInfo } } }) =>
            fetchUserInfoFulfilled(userInfo),
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
    case FETCH_CATEGORIES_FULFILLED:
      return update(state, {
        categories: { 
          $set: action.categories,
        },
      });
    case FETCH_USER_INFO_FULFILLED:
      return update(state, {
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
