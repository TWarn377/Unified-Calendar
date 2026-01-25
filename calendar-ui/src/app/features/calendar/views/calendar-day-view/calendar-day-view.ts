import { Component } from '@angular/core';
import { DateService } from '../../services/date-service/date-service';
import { CalendarService } from '../../services/calendar-service/calendar-service';

@Component({
  standalone: false,
  selector: 'app-calendar-day-view',
  templateUrl: './calendar-day-view.html',
  styleUrl: './calendar-day-view.less'
})
export class CalendarDayView {


  public currentDate: Date = new Date();

  /* The day title at the top of the calendar. */
  public isLongDayUsed: boolean = true;


  constructor(
    private dateService: DateService,
    private calendarService: CalendarService
  ) {
    dateService.currentDate$.subscribe((date: Date) => {
      this.currentDate = date;
    });
  }

  public getDayTitleFormat() : string {
    return this.isLongDayUsed ? 'EEE, MMM d, yyyy' : 'M/d/y';
  }

  public previousDay() : void {
    this.dateService.previousDay();
  }

  public nextDay() : void {
    this.dateService.nextDay();
  }

  public setDateAsToday() : void {
    this.dateService.setDate(new Date())
  }
}
