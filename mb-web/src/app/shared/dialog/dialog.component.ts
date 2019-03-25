import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('*', style({ opacity: .16 })),
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.4s ease-in-out')
      ]),
      transition(':leave',
        animate('.4s ease-in-out', style({ opacity: 0 }))
      )
    ])
  ],
  host: {
    '[@fadeInOut]': 'state'
  }
})
export class DialogComponent implements OnInit {

  state: boolean = true;

  constructor() { }

  ngOnInit() { }

}
