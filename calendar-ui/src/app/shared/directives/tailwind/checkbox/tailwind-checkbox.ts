import { Directive, HostBinding, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTailwindCheckbox]',
  standalone: false
})
export class TailwindCheckbox {
  readonly baseClasses: string = `w-4 h-4 bg-gray-100 border-gray-300 rounded `;
  readonly defaultClasses: string = `text-blue-600 focus:ring-blue-500`;
  readonly invalidClasses: string = `text-red-500 focus:ring-red-500`;

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
