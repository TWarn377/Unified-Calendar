import { CalendarEvent } from "../models/calendar-event.model";
import { CalendarWeek } from "../models/calendar-week.model";

export class CalendarUtilities {
    /**
   * Gets the first day of the first week of the month for the provided Date.
   * @param date The Date to get the first day of the first week of the month for.
   * @returns A Date of the first day of the first week of the month provided.
   */
  public static getCalendarStartingDate (date: Date): Date { 
    const firstOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
    return new Date(date.getFullYear(), date.getMonth(), 1 - firstOfMonth.getDay());
  }

  /**
   * Gets all CalendarEvents for the provided month, sorted by start date ascending.
   * @param month The month to get all the events for.
   * @returns An Array of CalendarEvents for the provided month.
   */
  public static getEventsForMonth(month: Array<CalendarWeek>): Array<CalendarEvent> {
    const events: Array<CalendarEvent> = month.flatMap(week => week.days.flatMap(day => day.events))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    return events;
  };


  /**
   * Checks if the provided event occurs on the specified date.
   * @param event The CalendarEvent to check.
   * @param date The date to check against.
   * @returns True if the event occurs on the specified date, false otherwise.
   */
  public static isEventOnDate(event: CalendarEvent, date: Date): boolean {
    return event.startDate.getFullYear() === date.getFullYear() 
      && event.startDate.getMonth() === date.getMonth()
      && event.startDate.getDate() === date.getDate();
  };

  /**
   * Checks if the provided event occurs within the specified date range.
   * @param event The CalendarEvent to check.
   * @param startDate The start date of the range.
   * @param endDate The end date of the range.
   * @returns True if the event occurs within the specified date range, false otherwise.
   */
  public static isEventWithinDate(event: CalendarEvent, startDate: Date, endDate: Date): boolean {
    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0,0,0);
    endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23,59,59);

    return event.startDate >= startDate && event.startDate <= endDate;
  };
}