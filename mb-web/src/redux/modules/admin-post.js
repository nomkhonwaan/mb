/**
 * External Dependencies
 */
import update from 'immutability-helper';
// import { debounce, mapTo, mergeMap } from 'rxjs/operators';
// import { ofType } from 'redux-observable';

const CHANGE_POST_CONTENT = 'CHANGE_POST_CONTENT';

/**
 * Update Post's content.
 * 
 * @param {string} content 
 */
export function changePostContent(id, content) {
  return {
    type: CHANGE_POST_CONTENT,
    id,
    content,
  };
}

// /**
//  * Update Post's content.
//  *  
//  * @param {object} action$ 
//  */
// export function changePostContentEpic(action$) {
//   return action$.pipe(
//     ofType(CHANGE_POST_CONTENT),
//     debounce(1000),
//     mergeMap(({ id, content }) => changePostContent(id, content)),
//   );
// }

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
        [action.id]: {
          $set: {
            content: action.content,
          },
        },
      });
    default:
      return state;
  }
}

export default adminPost;
