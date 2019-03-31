import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebAuth } from 'auth0-js';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';

// @Bean
const webAuth = {
  provide: WebAuth,
  useFactory: () => new WebAuth({
    clientID: environment.auth0.clientId,
    domain: 'nomkhonwaan.auth0.com',
    responseType: 'token id_token',
    redirectUri: environment.auth0.redirectUri,
    scope: 'email openid profile'
  })
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecentPostsComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    webAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
