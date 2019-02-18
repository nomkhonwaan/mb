/**
 * External Dependencies
 */
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

/**
 * Internal Dependencies
 */
import adminPost, { changePostContentEpic } from './admin-post';
import app from './app';

export const rootEpic = combineEpics(
  changePostContentEpic,
);

export const rootReducers = combineReducers({
  adminPost,
  app,
});
