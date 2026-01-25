import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateUtilities } from '../../utilities/date-utilities';
import { CalendarUtilities } from '../../utilities/calendar-utilities';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public previousDate: Date | null = null;

  private currentDateSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  currentDate$: Observable<Date> = this.currentDateSubject.asObservable();

  constructor() {}

  /**
   * Sets the Date for the Service.
   * Emits the Date date across the Service.
   * @param date The Date to be set as the Current Date.
   */
  public setDate(date: Date): void {
    this.previousDate = this.currentDateSubject.value;
    this.currentDateSubject.next(date);
  }

  /**
   * Gets the current Date of the Service
   * @returns The current Date of the Service.
   */
  public getDate(): Date {
    return this.currentDateSubject.value;
  }

  /**
   * Sets the Date of the Service to the specified week in the current month (zero based index).
   * If the week is out of range of the month, the previous or next month is set accordingly.
   * The day of the week (Su,M,T,W,Th,F,Sa) is maintained.
   * @param weekNumber The zero-based index of the week in the month to set.
   */
  public setWeek(weekNumber: number): void {
    const currentDate: Date = this.currentDateSubject.value;
    const currentWeekIndex: number = DateUtilities.getWeekIndexInMonth(currentDate);

    const weekIndexDifference: number = weekNumber - currentWeekIndex;
    const dayDifference  = weekIndexDifference * 7;

    const newDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + dayDifference);
    console.log(`Setting week - New Date: ${newDate.toDateString()}`);
    this.setDate(newDate);
  }

  /**
   * Sets the Date of the Service to the specified day in the current month.
   * If the day is out of range of the month, the previous or next month is set accordingly.
   * @param dayNumber The day number in the month to set.
   */
  public setDay(dayNumber: number): void {
    const currentDate: Date = this.currentDateSubject.value;
    const newDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
    console.log(`Setting day - New Date: ${newDate.toDateString()}`);
    this.setDate(newDate);
  }

  /**
   * Sets the Date for the Service to the next day.
   * Emits the new Date across the Service.
   */
  public nextDay(): void {
    const nextDay: Date = new Date(this.currentDateSubject.value);
    nextDay.setDate(nextDay.getDate() + 1);

    this.setDate(nextDay);
  }

  /**
   * Sets the Date for the Service to the previous day.
   * Emits the new Date across the Service.
   */
  public previousDay(): void {
    const previousDay: Date = new Date(this.currentDateSubject.value);
    previousDay.setDate(previousDay.getDate() -1);

    this.setDate(previousDay);
  }

  /**
   * Sets the Date for the Service to the next month.
   * Emits the new Date across the Service.
   */
  public nextMonth(): void {
    const nextMonth: Date = new Date(this.currentDateSubject.value);
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
    
    this.setDate(nextMonth);
  }

  /**
   * Sets the Date for the Service to the previous month.
   * Emits the new Date across the Service.
   */
  public previousMonth(): void {
    const previousMonth: Date = new Date(this.currentDateSubject.value);
    previousMonth.setMonth(previousMonth.getMonth() - 1, 1);

    this.setDate(previousMonth);
  }


  /**   
   * Sets the Date for the Service to the next year.
   * Emits the new Date across the Service.
   */
  public nextYear(): void {
    const nextYear: Date = new Date(this.currentDateSubject.value);
    nextYear.setFullYear(nextYear.getFullYear() + 1, 0, 1);

    this.setDate(nextYear);
  }

  /**   
   * Sets the Date for the Service to the previous year.
   * Emits the new Date across the Service.
   */
  public previousYear(): void {
    const previousYear: Date = new Date(this.currentDateSubject.value);
    previousYear.setFullYear(previousYear.getFullYear() - 1, 0, 1);

    this.setDate(previousYear);
  }
}
