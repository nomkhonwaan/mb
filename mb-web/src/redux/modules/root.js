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
  updatePostStatusEpic,
} from './admin-post';
import app, {
  fetchCategoriesEpic,
  fetchUserInfoEpic,
} from './app';
import recentPosts, { fetchLatestPublishedPostsEpic } from './recent-posts';
import single, { findPostByIdEpic } from './single';

export const rootEpic = combineEpics(
  createPostEpic,
  fetchCategoriesEpic,
  fetchLatestPublishedPostsEpic,
  fetchUserInfoEpic,
  findPostByIdEpic,
  startEditingPostEpic,
  updatePostContentEpic,
  updatePostTitleEpic,
  updatePostStatusEpic,
);

export const rootReducers = combineReducers({
  adminPost,
  app,
  recentPosts,
  single,
});
