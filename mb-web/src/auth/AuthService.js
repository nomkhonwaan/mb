/**
 * External Dependencies
 */
import auth0 from 'auth0-js';

/**
 * A wrapper class of the Auth0. 
 */
class AuthService {
  constructor(builder) {
    this.auth0 = new auth0.WebAuth({
      domain: builder.domain,
      clientID: builder.clientId,
      redirectUri: builder.redirectUri,
      responseType: builder.responseType,
      scope: builder.scope,
    });
  }
  
  /**
   * Returns an AuthService's builder class.
   */
  static get Builder() {
    /**
     * A builder class for building AuthService with allows to override some Auth0 config.
     */
    class Builder {
      // An application domain name for authorizing with Auth0
      domain = 'nomkhonwaan.auth0.com';

      // A type of the response that will be returned from Auth0
      responseType = 'token id_token';

      // A scope that will be used for retrieving user information after logged-in
      scope = 'openid email profile';

      /**
       * Allows customizing an application domain name. Default is "nomkhonwaan.auth0.com".
       * 
       * @param {string} domain 
       */
      withDomain(domain) {
        this.domain = domain;
        return this;
      }

      /**
       * Sets an application client ID.
       * 
       * @param {string} clientId 
       */
      withClientId(clientId) {
        this.clientId = clientId;
        return this;
      }

      /**
       * Sets a redirect URI (that has been whitelisting in the Auth0 already).
       * 
       * @param {string} redirectUri 
       */
      withRedirectUri(redirectUri) {
        this.redirectUri = redirectUri;
        return this;
      }

      /**
       * Allows customizing a type of the response.
       * 
       * @param {string} responseType 
       */
      withResponseType(responseType) {
        this.responseType = responseType;
        return this;
      }

      /**
       * Allows customizing a scope.
       *
       * @param {string} scope 
       */
      withScope(scope) {
        this.scope = scope;
        return this;
      }

      /**
       * Returns a new AuthService which contructs from builder object.
       */
      build() {
        return new AuthService(this);
      }
    }

    return new Builder();
  }

  /**
   * Returns an access token.
   */
  getAccessToken() {
    return this.accessToken;
  }

  /**
   * Returns an ID token.
   */
  getIdToken() {
    return this.idToken;
  }

  /**
   * Performs login with Auth0.
   */
  login() {
    this.auth0.authorize();
  }

  /**
   * Performs logout.
   */
  logout() {
    // Removes all tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Removes isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
  }

  /**
   * Checks whether the current time is past the access token's expiry time.
   */
  isAuthenticated() {
    return Date.now() < this.expiresAt;
  }

  /**
   * Looks for the result of authentication in the URL hash.
   * Then, the result is processed with the `parseHash` method from auth0.js.
   */
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return reject(err);
        }

        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);

          return resolve();
        }
        
        return reject();
      });
    });
  }

  /**
   * Sets the user's access token, ID token and the access token's expiry time.
   * 
   * @param {object} authResult 
   */
  setSession(authResult) {
    // Sets isLoggedIn flag to localStorage
    localStorage.setItem('isLoggedIn', true);

    // Sets the time that the access token will expire at
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = (authResult.expiresIn * 1000) + Date.now();
  }

  /**
   * Renews an existing session on Auth0's server.
   */
  renewSession() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          this.logout();
          return reject(err);
        }

        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        }

        return resolve();
      });
    });
  }
}

export default AuthService;
