/**
 * External Dependencies
 */
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

/**
 * Internal Dependencies
 */
import adminPost from './admin-post';
import app from './app';

export const rootEpic = combineEpics();

export const rootReducers = combineReducers({
  adminPost,
  app,
});
