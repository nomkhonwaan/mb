import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InputComponent } from './input/input.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    ButtonComponent,
    DialogComponent,
    DropdownComponent,
    InputComponent,
    SlideToggleComponent
  ],
  exports: [
    ButtonComponent,
    DialogComponent,
    DropdownComponent,
    InputComponent,
    SlideToggleComponent
  ],
})
export class SharedModule { }
