import { Component, effect, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CalendarEvent } from '../features/calendar/models/calendar-event.model';
import { DateService } from '../features/calendar/services/date-service/date-service';
import { CalendarEventService } from '../features/calendar/services/calendar-event-service/calendar-event-service';
import { EventGridItem } from '../features/calendar/models/calendar-event-grid-item.model';

@Component({
  selector: 'app-calendar-day-timeline',
  templateUrl: './calendar-day-timeline.html',
  styleUrl: './calendar-day-timeline.less',
  standalone: false,
})
export class CalendarDayTimeline implements OnChanges {
  @Input() isTimelineAxisVisible: boolean = true;
  @Input() inputDate: Date | null = null;

  public readonly MINUTES_PER_SECTION: number = 15;
  public readonly VERTICAL_SECTIONS: number = 24 * (60 / this.MINUTES_PER_SECTION);
  public readonly VERTICAL_REM_PER_HOUR: number = 2;
  public readonly VERTICAL_REM_PER_MINUTE: number = this.VERTICAL_REM_PER_HOUR / 60; // 2rem per hour
  public readonly VERTICAL_REM_PER_SECTION: number =
    this.VERTICAL_REM_PER_MINUTE * this.MINUTES_PER_SECTION;

  public currentDate: Date = new Date();
  public events = signal<Array<CalendarEvent>>([]);
  public eventGridItems = signal<Array<EventGridItem>>([]);

  /*
   * A 2D array representing the events on the timeline
   * each sub-array is a 15 minute section containing Event IDs.
   */
  public eventGridLayout: Array<Array<number>> = new Array(this.VERTICAL_SECTIONS).fill([]);
  public eventGridLayoutCounts: Array<number> = new Array(this.VERTICAL_SECTIONS).fill(0);

  constructor(
    private dateService: DateService,
    private calendarEventService: CalendarEventService
  ) {
    if (!this.inputDate) {
      this.dateService.currentDate$.subscribe((date: Date) => {
        this.currentDate = date;
      });

      this.calendarEventService.todaysEvents$.subscribe((events: Array<CalendarEvent>) => {
        this.events.set(events);
      });
    }

    // On Event Change
    effect(() => {
      this.setEventGridLayout(this.events());
      console.log('Event Grid Layout Updated:', this.eventGridLayout);
      this.setEventGridItems(this.events());
      console.log('Grid Items Updated:', this.eventGridItems());
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputDate']) {  
      this.currentDate = changes['inputDate'].currentValue || new Date();  
      this.events.set(this.calendarEventService.getEventsForDay(this.currentDate));
    }
  }

  public getHourFromIndex(index: number): number {
    return Math.floor(index / 4);
  }

  public getMinuteFromIndex(index: number): number {
    return (index % 4) * this.MINUTES_PER_SECTION;
  }

  public getIndexFromDate(date: Date): number {
    return date.getHours() * 4 + Math.floor(date.getMinutes() / 15);
  }

  public setEventGridLayout(events: Array<CalendarEvent>): void {
    for (let quarterHour = 0; quarterHour < this.VERTICAL_SECTIONS; quarterHour++) {
      const sectionStartTime: Date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        this.currentDate.getDate(),
        Math.floor(quarterHour / 4),
        (quarterHour % 4) * this.MINUTES_PER_SECTION
      );

      const sectionEndTime: Date = new Date(sectionStartTime);
      sectionEndTime.setMinutes(sectionStartTime.getMinutes() + this.MINUTES_PER_SECTION);

      const eventsInSection: Array<number> = events
        .filter((event: CalendarEvent) => {
          return event.startDate < sectionEndTime && event.endDate > sectionStartTime;
        })
        .map((event: CalendarEvent) => event.id);

      this.eventGridLayout[quarterHour] = eventsInSection;
    }
  }

  public setEventGridItems(events: Array<CalendarEvent>): void {
    this.eventGridItems.set([]);
    for (const event of events) {
      const { startDate, endDate } = this.getOverlappingEventsDateRange(event.startDate);
      const { eventCountDuringPeriod, eventHorizontalIndex } = this.getEventHorizontalMetrics(
        event.id,
        startDate,
        endDate
      );

      const eventWidth = 100 / eventCountDuringPeriod;
      const eventGridItem: EventGridItem = {
        event: event,
        verticalIndex: this.getEventVerticalIndex(event.startDate),
        horizontalIndex: eventWidth * eventHorizontalIndex,
        height: this.getEventHeight(event.startDate, event.endDate),
        width: eventWidth,
      };
      this.eventGridItems.update((items) => [...items, eventGridItem]);
    }
  }

  private getEventVerticalIndex(startTime: Date): number {
    const eventDurationMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    return eventDurationMinutes * this.VERTICAL_REM_PER_MINUTE;
  }

  private getEventHorizontalMetrics(
    eventId: number,
    startTime: Date,
    endTime: Date
  ): { eventCountDuringPeriod: number; eventHorizontalIndex: number } {
    const startingSection: number =
      startTime.getHours() * 4 + Math.floor(startTime.getMinutes() / this.MINUTES_PER_SECTION);
    const endingSection: number =
      endTime.getHours() * 4 + Math.floor(endTime.getMinutes() / this.MINUTES_PER_SECTION);

    const eventIDsDuringSections: Set<number> = new Set<number>();
    for (let section = startingSection; section < endingSection; section++) {
      this.eventGridLayout[section].forEach((id: number) => eventIDsDuringSections.add(id));
    }

    const eventIndex = Array.from(eventIDsDuringSections).indexOf(eventId);
    return {
      eventCountDuringPeriod: eventIDsDuringSections.size,
      eventHorizontalIndex: eventIndex,
    };
  }

  private getEventHeight(startTime: Date, endTime: Date): number {
    const durationInMinutes =
      endTime.getMinutes() -
      startTime.getMinutes() +
      (endTime.getHours() - startTime.getHours()) * 60;

    return durationInMinutes * this.VERTICAL_REM_PER_MINUTE;
  }

  private getOverlappingEventsDateRange(date: Date): { startDate: Date; endDate: Date } {
    // Go to the start of the date range
    let startingIndex = this.getIndexFromDate(date);
    // Used to omit adjacent, non-overlapping events
    const overlappingEvents: Set<number> = new Set<number>(this.eventGridLayout[startingIndex]);

    while (startingIndex > 0 && this.eventGridLayout[startingIndex - 1].length > 0) {
      // Check if events still overlap
      if (
        !this.eventGridLayout[startingIndex - 1].some((id: number) => overlappingEvents.has(id))
      ) {
        break;
      }
      this.eventGridLayout[startingIndex - 1].forEach((id: number) => overlappingEvents.add(id));

      startingIndex--;
    }

    const startDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate(),
      this.getHourFromIndex(startingIndex),
      this.getMinuteFromIndex(startingIndex)
    );

    // Go to the end of the overlapping events
    let endingIndex = startingIndex;

    while (endingIndex < this.VERTICAL_SECTIONS && this.eventGridLayout[endingIndex].length > 0) {
      // Check if events still overlap
      if (!this.eventGridLayout[endingIndex].some((id: number) => overlappingEvents.has(id))) {
        break;
      }
      this.eventGridLayout[endingIndex].forEach((id: number) => overlappingEvents.add(id));

      endingIndex++;
    }

    const endDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate(),
      this.getHourFromIndex(endingIndex - 1),
      this.getMinuteFromIndex(endingIndex - 1)
    );

    return { startDate: startDate, endDate: endDate };
  }
}
