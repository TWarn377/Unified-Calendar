import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreButton } from './core-button/core-button';
import { CorePageIndicatorDots } from './core-page-indicator-dots/core-page-indicator-dots';
import { MaterialModule } from '../../shared/material/material.module';



@NgModule({
  declarations: [
    CoreButton,
    CorePageIndicatorDots
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CoreButton,
    CorePageIndicatorDots
  ]
})
export class CoreModule { }
