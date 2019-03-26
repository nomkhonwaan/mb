import { Component, EventEmitter, OnInit, Output, OnDestroy, HostBinding } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('false', style({ opacity: 0 })),
      transition('* => true', [
        style({ opacity: 0 }),
        animate('.4s ease-in-out')
      ]),
      transition('true => false',
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
  @HostBinding('@fadeInOut')
  show: boolean;

  ngOnInit(): void {
    // NOTE:
    // For trigger fade-in transition. I'm not sure why direct assign value doesn't work.
    setTimeout(() => this.show = true, 0);
  }

}
