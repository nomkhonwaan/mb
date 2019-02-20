/**
 * External Dependencies
 */
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

/**
 * Internal Dependencies
 */
import adminPost, { 
  createPostEpic,
  editPostEpic,
  updatePostContentEpic,
  // changePostContentEpic,
  // changePostTitleEpic,
} from './admin-post';
import app, {
  fetchAppQueryEpic,
} from './app';

export const rootEpic = combineEpics(
  // changePostContentEpic,
  // changePostTitleEpic,
  createPostEpic,
  editPostEpic,
  fetchAppQueryEpic,
  updatePostContentEpic,
);

export const rootReducers = combineReducers({
  adminPost,
  app,
});
