/**
 * External Dependencies
 */
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { ConnectedRouter } = require('react-router-redux');
const { createBrowserHistory: createHistory } = require('history');

/**
 * Internal Dependencies
 */
require('./style.scss');
const App  = require('./App');
const configureStore = require('./redux/configureStore');
const serviceWorker = require('./serviceWorker');

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
