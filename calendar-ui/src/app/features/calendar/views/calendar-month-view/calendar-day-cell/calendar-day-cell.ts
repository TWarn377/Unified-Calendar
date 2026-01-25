import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { CalendarDay } from '../../../models/calendar-day.model';
import { DateService } from '../../../services/date-service/date-service';
import { CalendarEventService } from '../../../services/calendar-event-service/calendar-event-service';
import { CalendarEventCategoryService } from '../../../services/calendar-event-category-service/calendar-event-category-service';
import { CalendarEventObjectiveService } from '../../../services/calendar-event-objective-service/calendar-event-objective-service';

@Component({
  standalone: false,
  selector: 'app-calendar-day-cell',
  templateUrl: './calendar-day-cell.html',
  styleUrl: './calendar-day-cell.less',
})
export class CalendarDayCell  implements OnChanges {
  @Input() dayData: CalendarDay | null = null;
  @Input() currentDate: Date | null = null;


  public eventObjectiveDots = signal<Array<EventObjectiveDot>>([]);
  constructor (
    private dateService: DateService,
    private calendarEventService: CalendarEventService,
    private calendarEventCategoryService: CalendarEventCategoryService,
    private calendarEventObjectiveService: CalendarEventObjectiveService
  ) {
    this.calendarEventService.currentMonthEvents$.subscribe(() => {
      this.updateEventObjectiveDots();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dayData']) { this.updateEventObjectiveDots(); }
  }

  public onClick(): void {
    if (this.dayData !== null) { this.dateService.setDate(this.dayData?.date); }
  }

  public isDayHighlighted(): boolean {
    return this.isCurrentDay();
  }

  private isCurrentDay = (() => 
    this.dayData?.date.getDate() === this.currentDate?.getDate()
    && this.dayData?.date.getMonth() === this.currentDate?.getMonth()
    && this.dayData?.date.getFullYear() === this.currentDate?.getFullYear());

  private updateEventObjectiveDots(): void {
    const newEventObjectiveDots: Array<EventObjectiveDot> = this.calendarEventService.getEventsForDay(this.dayData?.date || new Date())
    .reduce<Array<EventObjectiveDot>>((acc: Array<EventObjectiveDot>, event) => {
      const category = this.calendarEventCategoryService.getCategoryById(event.categoryId);
      if (!category) { return acc; }

      const objective = category ? this.calendarEventObjectiveService.getObjectiveById(category.objectiveId) : null;

      const existingDot = acc.find(dot => dot.objectiveId === category?.objectiveId);
      if(existingDot) {
        existingDot.eventCount += 1;
      } else {
        acc.push({
          eventCount: 1,
          objectiveColor: objective ? objective.color : '#000000',
          objectiveName: objective ? objective.name : 'Unknown',
          objectiveId: category ? category.objectiveId : -1
        });
      }

      return acc;
    }, []);

    this.eventObjectiveDots.set(newEventObjectiveDots);
  }
}

interface EventObjectiveDot {
  eventCount: number;
  objectiveColor: string;
  objectiveName: string;
  objectiveId: number;
}
