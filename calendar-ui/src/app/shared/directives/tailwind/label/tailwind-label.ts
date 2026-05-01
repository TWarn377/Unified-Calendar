import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appTailwindLabel]',
  standalone: false
})
export class TailwindLabel {

  constructor() { }

  @HostBinding('class')
  get classes() {
    return `
  block
  text-gray-700
  text-sm 
  font-bold 
  mb-2
  `;
  }
}
