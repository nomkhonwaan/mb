import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  host: {
    "(click)": "close()"
  }
})
export class DialogComponent {
  /**
   * A callback function that fires on dialog close event.
   */
  @Output()
  onClose: EventEmitter<null> = new EventEmitter();

  /**
   * Fires dialog close event.
   */
  close() {
    this.onClose.emit();
  }
}
