import { Injectable } from '@angular/core';
import { CalendarEvent } from '../../calendar-event/calendar-event';
import { CalendarEventCategory } from '../../models/calendar-event.model';
import { CALENDAR_EVENT_CATEGORIES } from '../calendar-mock-data/calendar-mock-data';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventCategoryService {
  
  constructor() {}

  private categories: Array<CalendarEventCategory> = CALENDAR_EVENT_CATEGORIES;

  public getAllCategories(): Array<CalendarEventCategory> {
    return this.categories;
  }

  public getCategoryById(categoryId: number): CalendarEventCategory | null { 
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      return category;
    } else {
      // TO-DO: Fetch Category from server if not found locally
      return null;
    }
  }

}
