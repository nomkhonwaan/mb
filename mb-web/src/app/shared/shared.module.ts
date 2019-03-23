import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { DialogComponent } from './dialog/dialog.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ButtonComponent, SlideToggleComponent, DialogComponent, DropdownComponent, InputComponent],
  exports: [ButtonComponent, SlideToggleComponent, DialogComponent, DropdownComponent, InputComponent],
})
export class SharedModule { }
