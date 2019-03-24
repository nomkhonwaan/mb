import { Component } from '@angular/core';
import { faBars, faSearch, faTimes, IconDefinition } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {
    '[class.-sidebar-collapsed]': 'sidebarCollapsed'
  },
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faBars: IconDefinition = faBars;
  faSearch: IconDefinition = faSearch;
  faTimes: IconDefinition = faTimes;

  sidebarCollapsed: boolean = true;
}
