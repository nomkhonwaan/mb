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
  updatePostTitleEpic,
} from './admin-post';
import app, {
  fetchCategoriesEpic,
  fetchUserInfoEpic,
} from './app';

export const rootEpic = combineEpics(
  createPostEpic,
  editPostEpic,
  fetchCategoriesEpic,
  fetchUserInfoEpic,
  updatePostContentEpic,
  updatePostTitleEpic,
);

export const rootReducers = combineReducers({
  adminPost,
  app,
});
