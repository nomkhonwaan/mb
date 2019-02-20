/**
 * External Dependencies
 */
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

/**
 * Internal Dependencies
 */
import adminPost, { 
  // changePostContentEpic,
  // changePostTitleEpic,
} from './admin-post';
import app, {
  fetchAppQueryEpic,
} from './app';

export const rootEpic = combineEpics(
  // changePostContentEpic,
  // changePostTitleEpic,
  fetchAppQueryEpic,
);

export const rootReducers = combineReducers({
  adminPost,
  app,
});
