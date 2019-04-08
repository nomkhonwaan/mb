import { Apollo } from 'apollo-angular';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, HostBinding, OnInit } from "@angular/core";
import {
  faBars,
  faSearch,
  faTimes,
  IconDefinition
} from "@fortawesome/pro-light-svg-icons";
import gql from 'graphql-tag';

import { AuthService } from "./auth/auth.service";
import Category from './category';

@Component({
  animations: [
    trigger("slideInOut", [
      state("true", style({ transform: "translateX(0)" })),
      transition("* => true", [
        animate(".4s ease-in-out", style({ transform: "translateX(0)" }))
      ]),
      transition("true => false", [
        style({ transform: "translateX(0)" }),
        animate(".4s ease-in-out")
      ])
    ])
  ],
  selector: "app-root",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  /**
   * A group of Posts regarded as having particular shared characteristics.
   */
  categories: Category[];

  /**
   * A FontAwesome icon for displaying at .navbar as a sidebar toggle button.
   */
  faBars: IconDefinition = faBars;

  /**
   * A FontAwesome icon for displaying at .navbar as a search button.
   */
  faSearch: IconDefinition = faSearch;

  /**
   * A FontAwesome icon for displaying at .sidebar as an "x" button.
   */
  faTimes: IconDefinition = faTimes;

  /**
   * A .sidebar expansion state.
   */
  @HostBinding("@slideInOut")
  sidebarExpanded: boolean = false;

  constructor(
    private apollo: Apollo,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.renewTokens();
    }

    this.fetchCategories();
  }

  /**
   * Performs a GraphQL query to the backend API for retreving list of Categories.
   */
  fetchCategories(): void {
    this.apollo.watchQuery({
      query: gql`
        {
          categories {
            id
            name
            slug
          }
        }
      `
    }).valueChanges.subscribe((result) => {
      if (result.data) {
        this.categories = (result.data as { categories: Category[] }).categories;
      }
    });
  }

  /**
   * Toggles sidebar expansion state.
   */
  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
