import { Injectable } from '@angular/core';
import { CalendarEventCategory, CalendarEventObjective } from '../../models/calendar-event.model';
import { CALENDAR_OBJECTIVE_CATEGORY_MAP } from '../calendar-mock-data/calendar-mock-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventObjectiveService {
  constructor(private http: HttpClient) {}

  /**
   * Cached CalendarEventObjective objects.
   * This is an Array since the number of objectives is expected to be < 10.
   */
  private objectives: Array<CalendarEventObjective> = new Array<CalendarEventObjective>();

  // #region Get Methods
  
  /**
   * Get all the objectives.
   * @param isToFetchFromServer Override cache retrieval and update cache
   * @returns Returns an array of all accessible CalendarEventObjective objects
   */
  public getAllObjectives(isToFetchFromServer: boolean): Array<CalendarEventObjective> {
    let objectives = this.objectives;
    if (isToFetchFromServer || !objectives || objectives.length === 0) {
      objectives = this.fetchAllObjectives();
     }

    return this.objectives;
  }

  /**
   * Gets an Objective by it's ID.
   * Utilizes the local cache first, unless isToFetchFromServer is true.
   * @param objectiveId The ID of the objective to retrieve
   * @param isToFetchFromServer Override cache retrieval and update cache
   * @returns The CalendarEventObjective object if accessible, otherwise null
   */
  public getObjectiveById(objectiveId: number, isToFetchFromServer: boolean): CalendarEventObjective | null { 
    let objective = this.objectives.find(obj => obj.id === objectiveId);
    if (isToFetchFromServer || !objective) {
      objective = this.fetchObjectiveById(objectiveId) ?? undefined;
    }

    return objective || null;
  }

  // @endregion Get Methods


  // #region Fetch Methods

  /**
   * Fetches the objective by ID from the server
   * @param objectiveId - The ID of the objective to fetch
   * @return The CalendarEventObjective object if found, otherwise null
   */
  private fetchObjectiveById(objectiveId:number): CalendarEventObjective | null {
    let objective: CalendarEventObjective | null = null;
    this.http.get<CalendarEventObjective>(`/api/objective/${objectiveId}`).subscribe(
        (data) => { objective = data;}
      );

    return objective;
  }

  /**
   * Fetches all objectives from the server
   * @returns An array of all accessible CalendarEventObjectives
   */
  private fetchAllObjectives(): Array<CalendarEventObjective> {
    let objectives: Array<CalendarEventObjective> = [];
    this.http.get<Array<CalendarEventObjective>>(`/api/objective`).subscribe(
        (data) => { objectives = data; }
      );

    return objectives;
  }

  // #endregion Fetch Methods 

  // #region Update Methods

  /**
   * Updates a objective on the server and updates the local cache if successful.
   * @param objectiveToUpdate The Objective to update
   * @returns The updated objective if the update was successful, otherwise null
   */
  private updateObjective(objective: CalendarEventObjective): CalendarEventObjective | null {
    let updatedObjective: CalendarEventObjective | null = null;
    this.http.put<CalendarEventObjective>(`/api/objective/${objective.id}`, objective).subscribe(
      (data: CalendarEventObjective) => { updatedObjective = data; }
    );

    if (updatedObjective) {
      this.updateLocalObjectives([updatedObjective]);
    }

    return updatedObjective;
  }



  // #endregion Update Methods

  // #region Delete Methods

  /**
   * Deletes an objective from the server and updates the local cache if successful
   * @param objectiveId The ID of the objective to delete
   * @returns A boolean indicating whether the deletion was a success
   */
  private deleteObjective(objectiveId: number): boolean {
    let isDeleted: boolean = false;

    this.http.delete(`/api/objective/${objectiveId}`).subscribe(
      () => { isDeleted = true; }
    );

    this.updateLocalObjectives(undefined, [{ id: objectiveId, name: '', color: '' }]);

    return isDeleted;
  }

  // #endregion Delete Methods

  // #region Helper Methods

  /**
   * Updates the local cache of objectives
   * @param objectivesToAdd The objectives to add to the local cache by ID
   * @param objectivesToRemove The objectives to remove from the local cache by ID
   */
  private updateLocalObjectives(objectivesToAdd?: Array<CalendarEventObjective>, objectivesToRemove?: Array<CalendarEventObjective>): void {
    const hasObjectivesToAdd: boolean = Boolean(objectivesToAdd && objectivesToAdd.length > 0);
    const hasObjectivesToRemove: boolean = Boolean(objectivesToRemove && objectivesToRemove.length > 0);
    
    if (hasObjectivesToAdd && !this.objectives) {
      this.objectives = [...objectivesToAdd!];
      return;
    }

    if (hasObjectivesToAdd || hasObjectivesToRemove) {
      this.objectives = this.objectives.reduce((acc, curObjective) => {
        
        const removedObjectiveIndex: number = objectivesToRemove?.findIndex(obj => obj.id === curObjective.id) ?? -1;
        const updatedObjectiveIndex: number = objectivesToAdd?.findIndex(obj => obj.id === curObjective.id) ?? -1;
        
        if (hasObjectivesToRemove && 
            removedObjectiveIndex !== -1 &&
            updatedObjectiveIndex === -1) {
            return acc;
        }

        if (updatedObjectiveIndex !== -1) {
          acc.push(objectivesToAdd![updatedObjectiveIndex]);
          objectivesToAdd!.splice(updatedObjectiveIndex, 1);
        } else {
          acc.push(curObjective);
        }

        return acc;
      }, [] as Array<CalendarEventObjective>);
    }
  }

  // #endregion Helper Methods
}