/**
 * External Dependencies
 */
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

/**
 * Internal Dependencies
 */
import adminPost, { 
  changePostContentEpic,
  changePostTitleEpic,
} from './admin-post';
import app from './app';

export const rootEpic = combineEpics(
  changePostContentEpic,
  changePostTitleEpic,
);

export const rootReducers = combineReducers({
  adminPost,
  app,
});
