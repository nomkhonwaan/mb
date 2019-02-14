/**
 * External Dependencies
 */
import '@fortawesome/fontawesome-pro/js/all';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

/**
 * Internal Dependencies
 */
import './style.css';
import App from './app';
import configureStore from './redux/configure-store';
import * as serviceWorker from './service-worker';
import { AuthService } from './auth';

/* Auth0 */
const authService = AuthService.Builder
  .withClientId(process.env.REACT_APP_AUTH0_CLIENT_ID)
  .withRedirectUri(process.env.REACT_APP_AUTH0_REDIRECT_URI)
  .build();

/* GraphQL */
const configOptions = { uri: process.env.REACT_APP_GRAPHQL_ENDPOINT };

if (authService.isAuthenticated()) {
  Object.assign(configOptions, {
    headers: {
      authorization: `Bearer ${authService.getAccessToken()}`,
    },
  });
}

const client = new ApolloClient(configOptions);

/* Redux */
const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <ApolloProvider client={ client }>
        <App authService={ authService } />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
