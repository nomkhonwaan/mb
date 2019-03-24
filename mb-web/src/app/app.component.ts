import { Component } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {
    '[class.-sidebar-collapsed]': 'sidebarCollapsed'
  },
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faTimes: IconDefinition = faTimes;

  sidebarCollapsed: boolean = false;
}
