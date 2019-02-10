/**
 * External Dependencies
 */
const { compose, combineReducers, createStore, applyMiddleware } = require('redux');
const { routerReducer, routerMiddleware } = require('react-router-redux');

/**
 * Internal Dependencies
 */
const app = require('./modules/app');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Creates new Redux which is embedded React router already. 
 * 
 * @param {object} history 
 */
function configureStore(history) {
  return createStore(
    combineReducers({
      app,
      router: routerReducer,
    }),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
  );
}

module.exports = configureStore;
