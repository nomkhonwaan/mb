import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.4s ease-in-out')
      ]),
      transition(':leave',
        animate('.4s ease-in-out', style({ opacity: 0 }))
      )
    ])
  ]
})
export class DialogComponent implements OnInit {

  /**
   * A callback function that fires after backdrop has been closed.
   */
  @Output()
  onClose: EventEmitter<null> = new EventEmitter();

  /**
   * A state for triggering :enter and :leave transitions.
   */
  show: boolean;

  constructor() { }

  ngOnInit(): void {
    // NOTE: For triger on :enter transition.
    // I'm not sure why assigning value directly doesn't work but in async context works.
    setTimeout(() => { this.show = true }, 0);
  }

  close(): void {
    this.onClose.emit();
  }

}
