import { Component, computed, Input, signal, ViewEncapsulation } from '@angular/core';
import { CalendarWeek } from '../../../models/calendar-week.model';
import { DateUtilities } from '../../../utilities/date-utilities';
import { DateService } from '../../../services/date-service/date-service';
import { CalendarUtilities } from '../../../utilities/calendar-utilities';

@Component({
  standalone: false,
  selector: 'app-calendar-week-row',
  templateUrl: './calendar-week-row.html',
  styleUrl: './calendar-week-row.less',
})
export class CalendarWeekRow {
  @Input() weekData: CalendarWeek | null = null;
  @Input() currentDate: Date = new Date();

  constructor (private dateService: DateService) {}

  public isWeekHighlighted(): boolean {
    if (this.isCurrentWeek()) { console.log(`New current Week: ${this.weekData?.weekNumber}`) }
    return this.isCurrentWeek();
  };

  public onClick(): void {
    console.log(`Week Row ${this.weekData?.weekNumber} Clicked`);
    this.setWeekAsCurrent();
  }

  private isCurrentWeek = () => this.weekData?.weekNumber === DateUtilities.getWeekIndexInMonth(this.currentDate);

  private setWeekAsCurrent(): void {
    this.dateService.setWeek(this.weekData?.weekNumber || 0);
  }
}
