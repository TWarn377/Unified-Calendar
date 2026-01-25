import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.html',
  styleUrl: './calendar-header.less'
})
export class CalendarHeader {
  constructor(private router : Router) {}

  public goToView(view: string): void {
    switch (view) {
      case 'day':
        this.router.navigate(['/day']);
        break;
      case 'week':
        this.router.navigate(['/week']);
        break;
      case 'month':
        this.router.navigate(['/month']);
        break;
      case 'year':
        this.router.navigate(['/year']);
        break;
      default:
        break;
    }
  }
}
