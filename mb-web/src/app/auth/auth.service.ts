import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  private idToken: string;
  private accessToken: string;
  private expiresAt: number;

  constructor(public router: Router) {}

}
