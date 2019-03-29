import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, HostBinding } from "@angular/core";
import {
  faBars,
  faSearch,
  faTimes,
  IconDefinition
} from "@fortawesome/pro-light-svg-icons";

import { AuthService } from "./auth/auth.service";

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
export class AppComponent {
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

  constructor(private authService: AuthService) {}

  /**
   * Toggles sidebar expansion state.
   */
  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
