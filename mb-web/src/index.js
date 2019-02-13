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
import './style.css';
import App from './app';
import configureStore from './redux/configureStore';
import * as serviceWorker from './serviceWorker';
import { AuthService } from './auth';

/* Auth0 */
const authService = AuthService.Builder
  .withClientId(process.env.REACT_APP_AUTH0_CLIENT_ID)
  .withRedirectUri(process.env.REACT_APP_AUTH0_REDIRECT_URI)
  .build();

/* GraphQL */
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

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
