import { Component, HostBinding } from "@angular/core";
import {
  faBars,
  faSearch,
  faTimes,
  IconDefinition
} from "@fortawesome/pro-light-svg-icons";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("slideInOut", [
      state("true", style({ transform: "translateX(0)" })),
      state("false", style({ transform: "translateX(-25.6rem)" })),
      transition("false => true", [
        style({ transform: "translateX(-25.6rem)" }),
        animate(".4s ease-in-out", style({ transform: "translateX(0)" }))
      ]),
      transition("true => false", [
        animate(".4s ease-in-out", style({ transform: "translateX(-25.6rem)" }))
      ])
    ])
  ]
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

  /**
   * Toggles sidebar expansion state.
   */
  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
