import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RecentPostsComponent } from "./recent-posts/recent-posts.component";

const routes: Routes = [
  { path: "", component: RecentPostsComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
