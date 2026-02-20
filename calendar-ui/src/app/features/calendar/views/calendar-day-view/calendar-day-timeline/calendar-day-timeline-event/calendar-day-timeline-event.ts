import { Component, Input } from '@angular/core';
import { EventGridItem } from '../../../../models/calendar-event-grid-item.model';

@Component({
  selector: 'app-calendar-day-timeline-event',
  templateUrl: './calendar-day-timeline-event.html',
  styleUrl: './calendar-day-timeline-event.less',
  standalone: false
})
export class CalendarDayTimelineEvent {
  @Input() eventGridItem: EventGridItem | null = null;

  constructor() { }
  
}
