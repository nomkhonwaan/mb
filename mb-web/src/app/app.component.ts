import { Component, HostBinding } from '@angular/core';
import { faBars, faSearch, faTimes, IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({ transform: 'translateX(0)' })),
      state('false', style({ transform: 'translateX(-25.6rem)' })),
      transition('false => true', [
        style({ transform: 'translateX(-25.6rem)' }),
        animate('.4s ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition('true => false', [
        animate('.4s ease-in-out', style({ transform: 'translateX(-25.6rem)' }))
      ])
    ])
  ]
})
export class AppComponent {

  faBars: IconDefinition = faBars;
  faSearch: IconDefinition = faSearch;
  faTimes: IconDefinition = faTimes;

  @HostBinding('@slideInOut')
  sidebarExpanded: boolean = false;

}
