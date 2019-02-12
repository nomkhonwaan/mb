/**
 * External Dependencies
 */
import { compose, combineReducers, createStore } from 'redux';

/**
 * Internal Dependencies
 */
import app from './modules/app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Creates new Redux which is embedded React router already. 
 */
function configureStore() {
  return createStore(
    combineReducers({
      app,
    }),
    composeEnhancers(),
  );
}

export default configureStore;
