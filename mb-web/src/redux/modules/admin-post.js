/**
 * External Dependencies
 */
import update from 'immutability-helper';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';

const CREATE_POST = 'CREATE_POST';
const CHANGE_POST_CONTENT = 'CHANGE_POST_CONTENT';
const CHANGE_POST_CONTENT_FULFILLED = 'CHANGE_POST_CONTENT_FULFILLED';

/**
 * Create a new Post.
 *
 * @param {string} id 
 */
export function createPost(id) {
  return {
    type: CREATE_POST,
    id,
  };
}

/**
 * Update the Post's content.
 * 
 * @param {string} id
 * @param {string} markdown 
 */
export function changePostContent(id, markdown, updatePostContent) {
  return {
    type: CHANGE_POST_CONTENT,
    id,
    markdown,
    updatePostContent,
  };
}

/**
 * Update the Post's content after after few seconds.
 * 
 * @param {string} id 
 * @param {string} markdown 
 */
export function changePostContentFulfilled(id, markdown) {
  return {
    type: CHANGE_POST_CONTENT_FULFILLED,
    id,
    markdown,
  };
}

/**
 * This epic uses for delay sending mutation request to the server.
 * 
 * @param {object} action$ 
 */
export function changePostContentEpic(action$) {
  return action$.pipe(
    ofType(CHANGE_POST_CONTENT),
    debounceTime(4000),
    mergeMap(({ id, markdown, updatePostContent }) => {
      // Perform GraphQL mutation for updating the Post's content
      updatePostContent({ 
        variables: { 
          input: { id, markdown, }, 
        }, 
      });

      return from(Promise.resolve(changePostContentFulfilled(id, markdown)));
    }),
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
    case CREATE_POST:
      return update(state, {
        [action.id]: {
          $set: {
            id: action.id,
          },
        },
      });
    case CHANGE_POST_CONTENT:
      return update(state, {
        [action.id]: {
          $set: {
            id: action.id,
            markdown: action.markdown,
          },
        },
      });
    default:
      return state;
  }
}

export default adminPost;
