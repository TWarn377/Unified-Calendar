import { Directive, HostBinding, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTailwindTextInput]',
  standalone: false
})
export class TailwindTextInput {
    readonly baseClasses: string = `
    shadow 
    appearance-none 
    border 
    rounded 
    w-full 
    py-2 
    px-3
    mb-3
    leading-tight 
    focus:outline-none 
    focus:shadow-outline
    text-gray-700`;

    readonly defaultClasses: string = `
    `;

    readonly invalidClasses: string = `
    border-red-500`;

  constructor(@Optional() @Self() private ngControl: NgControl) {}

  @HostBinding('class')
  get classes(): string {
    if (this.isInvalid()) {
      return `${this.baseClasses} ${this.invalidClasses}`;
    } else {
      return `${this.baseClasses} ${this.defaultClasses}`;
    }
  }

  private isInvalid(): boolean {
    return !!(this.ngControl 
      && this.ngControl.invalid 
      && this.ngControl.touched);
  }
}
