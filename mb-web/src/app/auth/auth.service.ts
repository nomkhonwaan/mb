import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { WebAuth } from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private idToken: string;
  private accessToken: string;
  private expiresAt: number;

  constructor(private router: Router, private webAuth: WebAuth) { }
}
