import { Injectable } from '@angular/core';
import { DateService } from '../date-service/date-service';
import { CalendarWeek } from '../../models/calendar-week.model';
import { CalendarDay } from '../../models/calendar-day.model';
import { BehaviorSubject } from 'rxjs';
import { DateUtilities } from '../../utilities/date-utilities';
import { CalendarUtilities } from '../../utilities/calendar-utilities';
import { CalendarEvent } from '../../models/calendar-event.model';
import { CalendarMockData } from '../calendar-mock-data/calendar-mock-data';

@Injectable({
  providedIn: 'root'
})
export class CalendarService { 
  index: number = 0;
  constructor(
    private dateService: DateService,
    private calendarMockDataService: CalendarMockData) { 
    console.log('Service instance', this);
    dateService.currentDate$.subscribe((date: Date) => {
      const previousDate: Date | null = this.dateService.previousDate;
      const isMonthChanged: boolean = DateUtilities.isMonthChanged(previousDate, date);
      const isWeekChanged: boolean = DateUtilities.isWeekChanged(previousDate, date);
      const isDayOfWeekChanged: boolean = DateUtilities.isDayOfWeekChanged(previousDate, date);
      const isDayChanged: boolean = DateUtilities.isDayChanged(previousDate, date);
      this.index++;
      console.log(`Date changed in Calendar Service ${this.index}`, { isMonthChanged, isWeekChanged, isDayChanged });

      if (this.currentMonthSubject.value.length === 0) {
        this.setMonth(date.getMonth());
        this.setWeek(DateUtilities.getWeekIndexInMonth(date), false);
        this.setDay(date.getDate(), false);
      }
      else if (isMonthChanged) {
        this.setMonth(date.getMonth());
      } else if (isWeekChanged && !isDayOfWeekChanged) {
        this.setWeek(DateUtilities.getWeekIndexInMonth(date), false);
      } else if (isDayChanged) {
        this.setDay(date.getDate(), false);
      }
    });
  }

  private currentMonthSubject: BehaviorSubject<Array<CalendarWeek>> = new BehaviorSubject<Array<CalendarWeek>>([]);
  public currentMonth$ = this.currentMonthSubject.asObservable();

  private currentWeekSubject: BehaviorSubject<CalendarWeek | null> = new BehaviorSubject<CalendarWeek | null>(null);
  public currentWeek$ = this.currentWeekSubject.asObservable();

  private currentDaySubject: BehaviorSubject<CalendarDay | null> = new BehaviorSubject<CalendarDay | null>(null);
  public currentDay$ = this.currentDaySubject.asObservable();



  private setMonth(monthNumber: number): void {
    const newDate: Date = new Date(this.dateService.getDate().getFullYear(), monthNumber, 1);

    const currentMonth = this.fetchWeeksInMonth(newDate);
    this.currentMonthSubject.next(currentMonth);
    console.log('Month set in Calendar Service', monthNumber, currentMonth);
  }

  /**
   * Sets the week of the service to the specified week number of the current month (zero-based index).
   * If the week number is out of range of the month, the previous of next month is set.
   * @param weekNumber The zero-based index of the week in the month to set.
   * @param isToSetDate Indicates whether to set the Date of the Date Service.
   */
  private setWeek(weekNumber: number, isToSetDate: boolean = true): void {
    let newDate: Date = new Date();
    if (isToSetDate) {
      //this.dateService.setWeek(weekNumber); REMOVE ONCE CONFIRMED NOT NEEDED
      newDate = this.dateService.getDate();
    }
    

    this.currentWeekSubject.next(this.fetchWeeksInMonth(newDate)[weekNumber]);
    this.currentDaySubject.next(this.currentWeekSubject.value?.days[this.dateService.getDate().getDay()] || null);
    if (this.currentDaySubject.value === null) { this.setDay(this.dateService.getDate().getDate()); }
  }

  /**
   * Sets the day of the service to be the specified day number of the current month.
   * @param dayNumber 
   * @param isToSetDate 
   */
  private setDay(dayNumber: number, isToSetDate: boolean = true): void {
    const newDate: Date | null  = new Date();
    if (isToSetDate) {
      //this.dateService.setDay(dayNumber); REMOVE ONCE CONFIRMED NOT NEEDED
    }

    const isDayInCurrentWeek: boolean = this.currentWeekSubject.value?.days
      .some((day: CalendarDay) => day.date.getDate() === newDate?.getDate() || false) || false;;
    if (isDayInCurrentWeek) {
      this.currentDaySubject.next(this.currentWeekSubject.value?.days[newDate.getDay()] || null);
    } else {
      this.setWeek(DateUtilities.getWeekIndexInMonth(this.dateService.getDate()), false);
    }
  }

  /**
   * Gets the CalendarWeeks in the Month of the provided Date.
   * @param date The Date to get the weeks in the month for.
   * @returns An Array of CalendarWeeks for the month of the provided Date.
   */
  public fetchWeeksInMonth(date: Date): Array<CalendarWeek> { // Made public for mock data service
    const weeksInMonth : Array<CalendarWeek> = [];
    const startingDate: Date = CalendarUtilities.getCalendarStartingDate(date);
    let currentDate: Date = new Date(startingDate);

    for (let weekIndex = 0; weekIndex <= DateUtilities.getWeeksInMonthCount(date); weekIndex++) {
      const week: CalendarWeek = {
        weekNumber: weekIndex,
        days: []
      }

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const day: CalendarDay = {
          date: new Date(currentDate),
          events: this.fetchEventsForDay(currentDate)
        }

        week.days.push(day);
        // Increment current Date
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() +1);
      }

      weeksInMonth.push(week);
    }

    return weeksInMonth;
  }

  /**
   * Fetches the events for the specified date.
   * @param date The date to fetch events for.
   * @returns An Array of CalendarEvents for the specified date.
   */
  private fetchEventsForDay(date: Date): Array<CalendarEvent> {
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0,0,0);
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23,59,59);
    const events: Array<CalendarEvent> = this.calendarMockDataService.getMockEventsForDateRange(startDate, endDate);
    
    return events.sort((a: CalendarEvent, b: CalendarEvent) => a.startDate.getTime() - b.startDate.getTime());
  }
}
