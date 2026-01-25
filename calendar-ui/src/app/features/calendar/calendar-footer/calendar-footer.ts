import { Component, Input } from '@angular/core';
import { CalendarEvent } from '../calendar-event/calendar-event';

@Component({
  standalone: false,
  selector: 'app-calendar-footer',
  templateUrl: './calendar-footer.html',
  styleUrl: './calendar-footer.less'
})
export class CalendarFooter {

  
  @Input() private events: Array<CalendarEvent> = [];
  
  
  constructor() {}


}
