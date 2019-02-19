/**
 * External Dependencies
 */
import update from 'immutability-helper';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';

const CHANGE_POST_TITLE = 'CHANGE_POST_TITLE';
const CHANGE_POST_TITLE_FULFILLED = 'CHANGE_POST_TITLE_FULFILLED';
const CHANGE_POST_CONTENT = 'CHANGE_POST_CONTENT';
const CHANGE_POST_CONTENT_FULFILLED = 'CHANGE_POST_CONTENT_FULFILLED';

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
    case CHANGE_POST_CONTENT:
      return update(state, {
        id: { $set: action.id, },
        markdown: { $set: action.markdown, },
      });
    case CHANGE_POST_CONTENT_FULFILLED:
      return update(state, {
        id: { $set: action.id, },
        title: { $set: action.markdown.split('\n')[0].replace(/((?!\w).)/, '').trim(), },
      });
    default:
      return state;
  }
}

export default adminPost;
