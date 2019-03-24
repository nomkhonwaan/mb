import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: .16 })),
      state('out', style({ opacity: 0 })),
      transition(':enter', animate('.4s ease-in-out')),
      transition(':leave', animate('.4s ease-in-out'))
    ])
  ],
  host: {
    '[@animation]'
  }
})
export class DialogComponent implements OnInit {
  state: string = 'fade-in';

  constructor() { }

  ngOnInit() {
  }

}
