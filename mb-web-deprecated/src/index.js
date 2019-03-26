/**
 * External Dependencies
 */
import '@fortawesome/fontawesome-pro/js/all';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

/**
 * Internal Dependencies
 */
import './style.css';
import App from './app';
import configureStore from './redux/configure-store';
import * as serviceWorker from './service-worker';
import { ApiClient } from './api';
import { AuthService } from './auth';

/* API */
const apiClient = ApiClient.Builder
  .withBackendUrl(process.env.REACT_APP_GRAPHQL_ENDPOINT)
  .build();

/* Auth0 */
const authService = AuthService.Builder
  .withClientId(process.env.REACT_APP_AUTH0_CLIENT_ID)
  .withRedirectUri(process.env.REACT_APP_AUTH0_REDIRECT_URI)
  .build();

/* Redux */
const store = configureStore(apiClient, authService);

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App authService={ authService } />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
