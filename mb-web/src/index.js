/**
 * External Dependencies
 */
import '@fortawesome/fontawesome-pro/js/all';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

/**
 * Internal Dependencies
 */
import './style.scss';
import App from './app';
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';

/* Redux */
const store = configureStore();

/* GraphQL */
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <ApolloProvider client={ client }>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
