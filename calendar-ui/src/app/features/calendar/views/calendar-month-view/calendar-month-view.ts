import { Component, computed } from '@angular/core';
import { DateService } from '../../services/date-service/date-service';
import { CalendarWeek } from '../../models/calendar-week.model';
import { CalendarService } from '../../services/calendar-service/calendar-service';
import { CalendarMockData } from '../../services/calendar-mock-data/calendar-mock-data';
import { DateUtilities } from '../../utilities/date-utilities';

@Component({
  standalone: false,
  selector: 'app-calendar-month-view',
  templateUrl: './calendar-month-view.html',
  styleUrl: './calendar-month-view.less'
})
export class CalendarMonthView {

  constructor(private dateService: DateService,
    private calendarService: CalendarService,
    private calendarMockData: CalendarMockData
  ) {
    
  }

  // #region Properties
  public currentDate: Date = new Date();
  private currentMonth: number = -1;
  public weekDayNames: Array<string> = [];


  // -- LAYOUT VARIABLES --

  public debug: boolean = true;

  /* The month name at the top of the calendar. */
  public isLongMonthUsed: boolean = true;
  public monthTitle: string = '';

  /* The weeks within the month. */
  public monthGrid: Array<CalendarWeek> = [];

  //#endregion Properties

  ngOnInit() {
    this.dateService.currentDate$.subscribe((date: Date) => {
      const newMonthTitle = this.isLongMonthUsed ? DateUtilities.getLongMonthName(date) : DateUtilities.getShortMonthName(date);
      if (this.monthTitle != newMonthTitle) {
        this.monthTitle = newMonthTitle;
      }
      this.currentDate = date;
    });

    this.calendarService.currentMonth$.subscribe((month : Array<CalendarWeek>) => {
      console.log('Month updated in Month View', month);
      this.monthGrid = month;
    });

    this.weekDayNames = DateUtilities.getShortDayNamesInWeek();
  }

  // #region Public Methods

  public nextMonth(): void {
    this.dateService.nextMonth();
  }

  public previousMonth(): void {
    this.dateService.previousMonth();
  }

  public setDateAsToday(): void {
    this.dateService.setDate(new Date());
  }

  // -- Calendar Display Methods --
  
  // -- Month --
  public getDaysInMonthCount() : number {
    return DateUtilities.getDaysInMonthCount(this.currentDate);
  }

  public getWeeksInMonthCount() : number {
    return DateUtilities.getWeeksInMonthCount(this.currentDate);
  }

  // #endregion Public Methods
  

  // #region Private Methods




  // #endregion Private Methods
  

}
