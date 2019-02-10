/**
 * External Dependencies
 */
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');

/**
 * Internal Dependencies
 */
require('./style.scss');
const App  = require('./app');
const configureStore = require('./redux/configureStore');
const serviceWorker = require('./serviceWorker');

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
