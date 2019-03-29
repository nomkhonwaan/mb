import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { WebAuth } from "auth0-js";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private accessToken: string;
  private idToken: string;
  private expiresAt: number;

  constructor(private webAuth: WebAuth, private router: Router) {}

  // get accessToken(): string {
  //   return this.accessToken;
  // }

  /**
   * Redirects to the Auth0 login page.
   */
  login(): void {
    this.webAuth.authorize();
  }

  /**
   * Parses the authentication result from URL hash.
   */
  handleAuthentication(): void {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      }

      console.error(`unexpected error occurred: ${err}`);
    });
  }

  /**
   * Stores the authentication result in class properties.
   */
  localLogin(authResult): void {
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = (authResult.expiresAt * 1000) + Date.now();
  }

  renewTokens(): void {
  //   this.webAuth.checkSession({}, (err, auth))
  // //   this.auth0.checkSession({}, (err, authResult) => {
  // //     if (authResult && authResult.accessToken && authResult.idToken) {
  // //       this.localLogin(authResult);
  // //     } else if (err) {
  // //       alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
  // //       this.logout();
  // //     }
  // //  });
  }

  /**
   * Removes the user's tokens and expiry time from class properties.
   */
  logout(): void {

  }

  /**
   * Checks whether the user's Access Token is set and its expiry time has passed.
   */
  isAuthenticated(): boolean {
    return this.accessToken && Date.now() < this.expiresAt;
  }
}
