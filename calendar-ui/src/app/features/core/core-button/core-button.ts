import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-button',
  templateUrl: './core-button.html',
})
export class CoreButton {
  @Input() color: 'primary' | 'indigo' | 'red' | 'green' = 'indigo';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    const base = 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
    const colors: Record<string, string> = {
      primary: 'text-black bg-emerald-200 hover:bg-emerald-400 focus:ring-emerald-300',
      indigo: 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
      red: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
      green: 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'
    };
    return `${base} ${colors[this.color]}`;
  }
}
