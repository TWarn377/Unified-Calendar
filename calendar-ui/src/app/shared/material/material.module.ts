import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  // imports: [],
  exports: [
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}