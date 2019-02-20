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
  startEditingPostEpic,
  updatePostContentEpic,
  updatePostTitleEpic,
} from './admin-post';
import app, {
  fetchCategoriesEpic,
  fetchUserInfoEpic,
} from './app';
import single, { findPostByIdEpic } from './single';

export const rootEpic = combineEpics(
  createPostEpic,
  fetchCategoriesEpic,
  fetchUserInfoEpic,
  findPostByIdEpic,
  startEditingPostEpic,
  updatePostContentEpic,
  updatePostTitleEpic,
);

export const rootReducers = combineReducers({
  adminPost,
  app,
  single,
});
