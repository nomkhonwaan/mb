/**
 * External Dependencies
 */
import auth0 from 'auth0-js';

/**
 * The authentication & authorization service. 
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
  
  static get Builder() {
    class Builder {
      domain = 'nomkhonwaan.auth0.com';

      responseType = 'token id_token';

      scope = 'openid email profile';

      withDomain(domain) {
        this.domain = domain;
        return this;
      }

      withClientId(clientId) {
        this.clientId = clientId;
        return this;
      }

      withRedirectUri(redirectUri) {
        this.redirectUri = redirectUri;
        return this;
      }

      withResponseType(responseType) {
        this.responseType = responseType;
        return this;
      }

      withScope(scope) {
        this.scope = scope;
        return this;
      }

      build() {
        return new AuthService(this);
      }
    }

    return Builder;
  }

  login() {
    this.auth0.authorize();
  }
}

export default AuthService;
