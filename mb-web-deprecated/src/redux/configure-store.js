/**
 * External Dependencies
 */
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

/**
 * Internal Dependencies
 */
import { rootEpic, rootReducers } from './modules/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Creates new Redux which is embedded React router already. 
 * 
 * @param {ApiClient}   apiClient
 * @param {AuthService} authService 
 */
function configureStore(apiClient, authService) {
  const epicMiddleware = createEpicMiddleware({
    dependencies: { 
      apiClient,
      authService,
    },
  });

  const store = createStore(
    rootReducers,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware,
      ),
    ),
  );

  epicMiddleware.run(rootEpic);

  return store;
}

export default configureStore;
