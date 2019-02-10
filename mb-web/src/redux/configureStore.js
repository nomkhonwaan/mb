/**
 * External Dependencies
 */
const { compose, combineReducers, createStore } = require('redux');

/**
 * Internal Dependencies
 */
const app = require('./modules/app');

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

module.exports = configureStore;
