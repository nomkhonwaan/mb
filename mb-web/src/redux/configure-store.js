/**
 * External Dependencies
 */
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

/**
 * Internal Dependencies
 */
import { rootReducers } from './modules/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();

/**
 * Creates new Redux which is embedded React router already. 
 */
function configureStore() {
  return createStore(
    rootReducers,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware,
      )
    ),
  );
}

export default configureStore;
