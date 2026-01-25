import { Injectable } from '@angular/core';
import { DateService } from '../date-service/date-service';
import { CalendarEvent } from '../../models/calendar-event.model';
import { BehaviorSubject } from 'rxjs';
import { CalendarService } from '../calendar-service/calendar-service';
import { CalendarWeek } from '../../models/calendar-week.model';
import { CalendarUtilities } from '../../utilities/calendar-utilities';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {
    private readonly lookAheadDays: number = 7;

    constructor(
      private dateService: DateService,
      private calendarService: CalendarService) {
        console.log('Service instance', this.calendarService);
        this.calendarService.currentMonth$.subscribe((month: Array<CalendarWeek>) => {
          console.log('Fetching events for month');
          const events: Array<CalendarEvent> = CalendarUtilities.getEventsForMonth(month);
          this.currentMonthEventsSubject.next(events);
        });
        
        this.dateService.currentDate$.subscribe(() => {
          this.updateViewedEventForDay();
        });
      }

    private currentMonthEventsSubject: BehaviorSubject<Array<CalendarEvent>> = new BehaviorSubject<Array<CalendarEvent>>([]);
    public currentMonthEvents$ = this.currentMonthEventsSubject.asObservable();

    private upcomingEventsSubject = new BehaviorSubject<Array<CalendarEvent>>([]);
    public upcomingEvents$ = this.upcomingEventsSubject.asObservable();

    private todaysEventsSubject = new BehaviorSubject<Array<CalendarEvent>>([]);
    public todaysEvents$ = this.todaysEventsSubject.asObservable();

    private updateViewedEventForDay(): void {
      console.log('Setting upcoming and today\'s events');
      const events: Array<CalendarEvent> = this.currentMonthEventsSubject.getValue();
      const currentDate: Date = this.dateService.getDate();
      this.todaysEventsSubject.next(events.filter(event => CalendarUtilities.isEventOnDate(event, currentDate)));

      const lookAheadDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + this.lookAheadDays);
      this.upcomingEventsSubject.next(events.filter(event => CalendarUtilities.isEventWithinDate(event, currentDate, lookAheadDate)));
    }

    public getEventsForDay(date: Date): Array<CalendarEvent> {
      const events: Array<CalendarEvent> = this.currentMonthEventsSubject.getValue();
      return events.filter(event => CalendarUtilities.isEventOnDate(event, date));
    }
}
