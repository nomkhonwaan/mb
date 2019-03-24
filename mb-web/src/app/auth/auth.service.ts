import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private idToken: string;
  private accessToken: string;
  private expiresAt: number;

  constructor(public router: Router) {

  }

  // static get Builder() {
  //   class Builder {
  //     domain: string = 'nomkhonwaan.auth0.com';
  //     clientId = '';
  //     responseType = 'token id_token';
  //     redirectUri = '';
  //     scope = 'openid email profile';

  //     withClientId(clientId) {
  //       this.clientId = clientId;
  //       return this;
  //     }

  //     withRedirectUri(redirectUri) {
  //       this.redirectUri = redirectUri;
  //       return this;
  //     }

  //     build() {
  //       return new AuthService()
  //     }
  //   }

  //   return new Builder();
  // }

}
