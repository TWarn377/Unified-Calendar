import { Component } from '@angular/core';
import { CalendarWeek } from '../../models/calendar-week.model';
import { CalendarService } from '../../services/calendar-service/calendar-service';

@Component({
  standalone: false,
  selector: 'app-calendar-week-view',
  templateUrl: './calendar-week-view.html',
  styleUrl: './calendar-week-view.less'
})
export class CalendarWeekView {
  public week: CalendarWeek | null = null;

  constructor (private calendarService: CalendarService) { 
    this.calendarService.currentWeek$.subscribe((week: CalendarWeek | null) => {
      this.week = week;
      console.log('Week updated in Week View:', week);
    });
  }
}
