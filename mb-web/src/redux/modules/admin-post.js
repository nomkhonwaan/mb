/**
 * External Dependencies
 */
import update from 'immutability-helper';

const CHANGE_POST_CONTENT = 'CHANGE_POST_CONTENT';

/**
 * On change Post's content.
 * 
 * @param {string} content 
 */
export function changePostContent(content) {
  return {
    tpye: CHANGE_POST_CONTENT,
    content,
  }
}

const initialState = {

};

/**
 * A reducer of the administrator Post module.
 * 
 * @param {object} state 
 * @param {object} action 
 */
function adminPost(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default adminPost;
