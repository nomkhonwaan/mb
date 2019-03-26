import { Component, OnInit, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  host: {
    '[class.-icon]': 'icon',
    '[class.-ltr]': 'ltr',
    '[class.-no-text]': 'noText'
  },
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  icon: IconDefinition;

  @Input()
  ltr: boolean = false;

  @Input()
  noText: boolean = false;

  constructor() {}

  ngOnInit() {}

}
