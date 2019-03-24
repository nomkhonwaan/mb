import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.4s ease-in-out', style({ opacity: .16 }))
      ]),
      transition(':leave', [
        animate('.4s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
