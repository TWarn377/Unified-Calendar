import { NgModule } from '@angular/core';
import { TailwindTextInput } from './text-input/tailwind-text-input';
import { TailwindLabel } from './label/tailwind-label';
import { TailwindCheckbox } from './checkbox/tailwind-checkbox';

@NgModule({
  declarations: [
    TailwindCheckbox,
    TailwindTextInput,
    TailwindLabel
  ],
  exports: [
    TailwindCheckbox,
    TailwindTextInput,
    TailwindLabel
  ]
})
export class TailwindDirectivesModule {}