import { Component, computed, effect, signal } from '@angular/core';
import { CalendarEvent } from '../../../models/calendar-event.model';
import { CalendarEventService } from '../../../services/calendar-event-service/calendar-event-service';
import { CorePageIndicator } from '../../../../core/models/core-page-indicator.model';

@Component({
  selector: 'app-calendar-task-view-banner',
  templateUrl: './calendar-task-view-banner.html',
  styleUrl: './calendar-task-view-banner.less',
  standalone: false,
})
export class CalendarTaskViewBanner {
  constructor(private eventService: CalendarEventService) {
    this.eventService.todaysEvents$.subscribe((events: Array<CalendarEvent>) => {
      this.todaysEvents.set(events);
    });
    this.eventService.upcomingEvents$.subscribe((events: Array<CalendarEvent>) => {
      this.upcomingEvents.set(events);
    });

    // On Events Shown change, update pagination & reset selection index
    effect(() => {
      this.setPaginatorItems(this.eventsShown());
      this.currentEventIndex.set(0);
    });
  }

  public state = signal<CalendarTaskViewBannerState>('upcoming');
  public paginatorItems = signal<Array<CorePageIndicator>>([]);
  public currentEventIndex = signal<number>(0);
  public currentEvent = computed(() => {
    const events = this.eventsShown();
    const index = this.currentEventIndex();

    //console.log(`Current Event Index: ${index}, Events Length: ${events.length}`, events);
    return events[index];
  });

  public todaysEvents = signal<Array<CalendarEvent>>([]);
  public upcomingEvents = signal<Array<CalendarEvent>>([]);
  public eventsShown = computed(() => {
    switch (this.state()) {
      case 'today':
        return this.todaysEvents();
      case 'upcoming':
        return this.upcomingEvents();
      default:
        return this.upcomingEvents();
    }
  });

  private setPaginatorItems(events: Array<CalendarEvent>): void {
    this.paginatorItems.set(
      events.map((event: CalendarEvent, index: number) => ({
        index: index,
        label: event.title,
      }))
    );
  }
}

type CalendarTaskViewBannerState = 'today' | 'upcoming';
