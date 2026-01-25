import { Component } from '@angular/core';
import { DateService } from '../../services/date-service/date-service';

@Component({
  selector: 'app-calendar-year-view',
  templateUrl: './calendar-year-view.html',
  styleUrl: './calendar-year-view.less',
  standalone: false
})
export class CalendarYearView {
  public currentDate: Date = new Date();
  public months: CalendarViewMonth[] = []

  constructor(private dateService: DateService) {
    this.generateCalendarViewMonths();

    dateService.currentDate$.subscribe((date: Date) => {
      this.currentDate = date;
    });
   }

  public nextYear(): void {
    this.dateService.nextYear();
  }

  public previousYear(): void {
    this.dateService.previousYear();
  }

  public setDateAsToday(): void {
    this.dateService.setDate(new Date());
  }

  public setMonth(monthIndex: number): void {
    const newDate: Date = new Date(this.currentDate.getFullYear(), monthIndex, 1);
    this.dateService.setDate(newDate);
  }

  public isMonthHighlighted(monthIndex: number): boolean { 
    return this.currentDate.getMonth() === monthIndex;
  }

  private generateCalendarViewMonths(): void {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const monthName: string = new Date(this.currentDate.getFullYear(), monthIndex).toLocaleString('default', { month: 'long' });
      this.months.push({ monthIndex, monthName });
    }
  }
}

interface CalendarViewMonth {
  monthIndex: number;
  monthName: string;
}
