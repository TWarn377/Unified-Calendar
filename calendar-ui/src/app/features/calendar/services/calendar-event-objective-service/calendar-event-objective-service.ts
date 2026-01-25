import { Injectable } from '@angular/core';
import { CalendarEventObjective } from '../../models/calendar-event.model';
import { CALENDAR_OBJECTIVE_CATEGORY_MAP } from '../calendar-mock-data/calendar-mock-data';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventObjectiveService {
  private objectives: Array<CalendarEventObjective> = [
    { id: 1, name: 'Life', color: '#2072AF' }, // Cornflower Ocean Blue
    { id: 2, name: 'Work', color: '#177245' }, // Dark Emerald Green
    { id: 3, name: 'Play', color: '#C51E3A' } // Intense Cherry Red
  ]; 

  /**
   * Get all the objectives.
   * Does not include categories.
   * @returns Returns an array of all CalendarEventObjective objects.
   */
  public getAllObjectives(): Array<CalendarEventObjective> {
    return this.objectives;
  }

  public getObjectiveById(objectiveId: number): CalendarEventObjective | null { 
    const objective = this.objectives.find(obj => obj.id === objectiveId);
    if (objective) {
      return objective;
    } else {
      // TO-DO: Fetch Objective from server if not found locally
      return null;
    }
  }

  public getCategoriesForObjective(objectiveId: number): Array<number> | null {
    const objective = this.objectives.find(obj => obj.id === objectiveId);
    return objective ? objective.categories?.map(category => category.id) || [] : null;
  }

  public fetchCategoriesForObjectives(objectiveId: number): void {
    const objectiveCategoryMap: { [key: number]: number[] } = CALENDAR_OBJECTIVE_CATEGORY_MAP;
    for (const obj of this.objectives) {

    }
  }
}