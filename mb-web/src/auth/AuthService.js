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
   * Performs login with Auth0.
   */
  login() {
    this.auth0.authorize();
  }
}

export default AuthService;
