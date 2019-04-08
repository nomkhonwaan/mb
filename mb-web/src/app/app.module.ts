import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { WebAuth } from 'auth0-js';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecentPostsComponent } from './recent-posts/recent-posts.component';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';

// @Bean
const auth0WebAuth = {
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
    ApolloModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpLinkModule,
    SharedModule
  ],
  providers: [
    auth0WebAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private httpLink: HttpLink
  ) {
    const http = httpLink.create({ uri: environment.graphql.endpoint });
    const auth = setContext(() => {
      if (authService.isAuthenticated()) {
        const token: string = authService.accessToken;

        return {
          headers: { Authorization: `Bearer ${token}` }
        };
      }

      return {};
    });

    apollo.create({
      cache: new InMemoryCache(),
      link: auth.concat(http)
    });
  }

}
