import { CalendarEvent } from './calendar-event.model';

export interface CalendarDay {
    /* The date of the day. */
    date: Date;
    
    /* The events for the day.*/
    events: Array<CalendarEvent>;
}