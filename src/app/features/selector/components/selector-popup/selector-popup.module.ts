import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorPopupComponent } from './selector-popup.component';



@NgModule({
  declarations: [
      SelectorPopupComponent
  ],
  imports: [
    CommonModule
  ],
    exports: [
        SelectorPopupComponent
    ]
})
export class SelectorPopupModule { }
