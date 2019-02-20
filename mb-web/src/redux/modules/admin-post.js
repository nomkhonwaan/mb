/**
 * External Dependencies
 */
import update from 'immutability-helper';
import { ofType } from 'redux-observable';
import { debounceTime, map, mergeMap } from 'rxjs/operators';

const CREATE_POST = 'CREATE_POST';
const CREATE_POST_FULFILLED = 'CREATE_POST_FULFILLED';

const EDIT_POST = 'EDIT_POST';
const EDIT_POST_FULFILLED = 'EDIT_POST_FULFILLED';

const UPDATE_POST_TITLE_FULFILLED = 'UPDATE_POST_TITLE_FULFILLED';

const UPDATE_POST_CONTENT = 'UPDATE_POST_CONTENT';
const UPDATE_POST_CONTENT_FULFILLED = 'UPDATE_POST_CONTENT_FULFILLED';

/**
 * List of GraphQL's fragments
 */
const fragments = {
  post: `
    fragment post on Post {
      id
      title
      slug
      status
      markdown
      html
      author {
        avatarUrl
        displayName
      }
      categories {
        name
        slug
      }
      publishedAt
      createdAt
      updatedAt
    }
  `,
};

/**
 * Creates a new Post.
 */
export function createPost() {
  return {
    type: CREATE_POST,
  };
}

/**
 * Creates a new Post successfully.
 * 
 * @param {string} id 
 * @param {string} createdAt 
 */
export function createPostFulfilled(id, createdAt) {
  return {
    type: CREATE_POST_FULFILLED,
    id,
    createdAt,
  };
}

/**
 * Performs an API call to the backend.
 * 
 * @param {object} action$ 
 * @param {object} state$ 
 * @param {object} dependencies 
 */
export function createPostEpic(action$, state$, dependencies) {
  const { apiClient, authService } = dependencies;
  const mutation = `
    mutation CreatePost {
      createPost {
        ...post
      }
    }

    ${fragments.post}
  `;

  return action$.pipe(
    ofType(CREATE_POST),
    mergeMap(() =>
      apiClient
        .do(mutation, {}, {
          'Authorization': `Bearer ${authService.getAccessToken()}`,
        })
        .pipe(
          map(({ response: { data: { createPost: { id, createdAt } } } }) => 
            createPostFulfilled(id, createdAt)
          ),
        ),
    ),
  );
}

/**
 * By start editing the Post, there needs to query the previous data from the data store.
 * 
 * @param {string} id 
 */
export function editPost(id) {
  return {
    type: EDIT_POST,
    id,
  };
}

/**
 * Query the Post successfully.
 * 
 * @param {object} post 
 */
export function editPostFulfilled(post) {
  return {
    type: EDIT_POST_FULFILLED,
    post,
  };
}

/**
 * Performs an API call to the backend.
 * 
 * @param {object} action$ 
 * @param {object} state$ 
 * @param {object} dependencies 
 */
export function editPostEpic(action$, state$, dependencies) {
  const { apiClient, authService } = dependencies;
  const query = `
    query EditPostQuery($id: ID!) {
      post(id: $id) {
        ...post
      }
    }

    ${fragments.post}
  `;

  return action$.pipe(
    ofType(EDIT_POST),
    mergeMap(({ id }) =>
      apiClient
        .do(query, { id }, {
          'Authorization': `Bearer ${authService.getAccessToken()}`,
        })
        .pipe(
          map(({ response: { data: { post } } }) =>
            editPostFulfilled(post)          
          ),
        ),
    ),
  );
}

/**
 * Update the Post's title successfully.
 * 
 * @param {string} id 
 * @param {string} title 
 * @param {string} slug 
 */
export function updatePostTitleFulfilled(id, title, slug) {
  return {
    type: UPDATE_POST_TITLE_FULFILLED,
    id,
    title,
    slug,
  };
}

/**
 * Performs an API call to the backend.
 * 
 * @param {object} action$ 
 * @param {object} state$ 
 * @param {object} dependencies 
 */
export function updatePostTitleEpic(action$, state$, dependencies) {
  const { apiClient, authService } = dependencies;
  const mutation = `
    mutation UpdatePostTitle($input: UpdatePostTitleInput!) {
      updatePostTitle(input: $input) {
        ...post
      }
    }

    ${fragments.post}
  `;
  
  return action$.pipe(
    ofType(UPDATE_POST_CONTENT),
    debounceTime(8000),
    mergeMap(({ id, markdown }) => 
      apiClient
        .do(mutation, { input: { id, title: markdown.split('\n')[0].replace(/((?!\w).)/, '').trim() } }, {
          'Authorization': `Bearer ${authService.getAccessToken()}`,
        })
        .pipe(
          map(({ response: { data: { updatePostTitle: { id, title, slug } } } }) => 
            updatePostTitleFulfilled(id, title, slug),
          ),
        ),
    ),
  );
}

/**
 * Updates the Post's content.
 * 
 * @param {string} id 
 * @param {string} markdown 
 */
export function updatePostContent(id, markdown) {
  return {
    type: UPDATE_POST_CONTENT,
    id,
    markdown,
  };
}

/**
 * Updates the Post's content successfully.
 * 
 * @param {string} id 
 * @param {string} markdown 
 */
export function updatePostContentFulfilled(id, markdown, html) {
  return {
    type: UPDATE_POST_CONTENT_FULFILLED,
    id,
    markdown,
    html,
  };
}

/**
 * Performs an API call to the backend.
 * 
 * @param {object} action$ 
 * @param {object} state$ 
 * @param {object} dependencies 
 */
export function updatePostContentEpic(action$, state$, dependencies) {
  const { apiClient, authService } = dependencies;
  const mutation = `
    mutation UpdatePostContent($input: UpdatePostContentInput!) {
      updatePostContent(input: $input) {
        ...post
      }
    }

    ${fragments.post}
  `;

  return action$.pipe(
    ofType(UPDATE_POST_CONTENT),
    debounceTime(8000),
    mergeMap(({ id, markdown }) =>
      apiClient
        .do(mutation, { input: { id, markdown } }, {
          'Authorization': `Bearer ${authService.getAccessToken()}`,
        })
        .pipe(
          map(({ response: { data: { updatePostContent: { id, markdown, html } } } }) =>
            updatePostContentFulfilled(id, markdown, html)
          ),
        ),
    ),
  );
}

const initialState = {};

/**
 * A reducer of the administrator Post module.
 * 
 * @param {object} state 
 * @param {object} action 
 */
function adminPost(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST_FULFILLED:
      return update(state, {
        id: { $set: action.id },
        createdAt: { $set: action.createdAt },
      });
    case EDIT_POST_FULFILLED:
      return update(state, {
        $set: action.post,
      });
    case UPDATE_POST_TITLE_FULFILLED:
      return update(state, {
        id: { $set: action.id },
        title: { $set: action.title },
        slug: { $set: action.slug },
      });
    case UPDATE_POST_CONTENT:
      return update(state, {
        id: { $set: action.id },
        markdown: { $set: action.markdown },
      });
    case UPDATE_POST_CONTENT_FULFILLED:
      return update(state, {
        html: { $set: action.html },
      });
    // case CHANGE_POST_CONTENT:
    //   return update(state, {
    //     id: { $set: action.id, },
    //     markdown: { $set: action.markdown, },
    //   });
    // case CHANGE_POST_TITLE:
    //   return update(state, {
    //     id: { $set: action.id, },
    //     title: { $set: action.title, },
    //   });
    default:
      return state;
  }
}

export default adminPost;
