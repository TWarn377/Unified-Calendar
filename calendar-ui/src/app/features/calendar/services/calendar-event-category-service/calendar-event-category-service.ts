import { Injectable } from '@angular/core';
import { CalendarEventCategory } from '../../models/calendar-event.model';
import { mergeArrays } from '../../utilities/array-utilities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventCategoryService {
  constructor(private http: HttpClient) {}

  /**
   * Cached CalendarEventCategory objects.
   * This is a Map since the user determines the number of Categories.
   */
  private categories: Map<number, CalendarEventCategory> = new Map<number, CalendarEventCategory>();


  // #region Get Methods

  /**
   * Gets a category by its ID.
   * Utilizes the local cache first, unless isToFetchFromSever is true.
   * @param categoryId 
   * @returns 
   */
  public getCategoryById(categoryId: number, isToFetchFromServer: boolean): CalendarEventCategory | null { 
    let category = this.categories.get(categoryId) || null;

    if (isToFetchFromServer || !category) {
      category = this.fetchCategoryById(categoryId);
      this.categories.set(categoryId, category as CalendarEventCategory);
    }

    return category;
  }

  /**
   * Gets all categories associated with a specific objective.
   * @param objectiveId The ID of the objective to retrieve categories for
   * @param isToFetchFromServer Override cache retrieval and update cache
   * @returns An array of accessible categories for the specific objective
   */
  public getCategoriesByObjectiveId(objectiveId: number, isToFetchFromServer: boolean): Array<CalendarEventCategory> | null {
    let categories = isToFetchFromServer ? 
      null :
      Array.from(this.categories.values()).filter(category => category.objectiveId === objectiveId);

    if (isToFetchFromServer || !categories || categories.length === 0) {
      categories = this.fetchCategoriesByObjectiveId(objectiveId);
      this.updateLocalCategories(categories);
    }

    return categories || null;
  }

  /**
   * Gets all categories.
   * @param isToFetchFromServer Override cache retrieval and update cache
   * @returns Returns and array of all accessible CalendarEventCategory objects
   */
  public getAllCategories(isToFetchFromServer: boolean): Array<CalendarEventCategory> {
    let categories: Array<CalendarEventCategory> = Array.from(this.categories.values());

    if (isToFetchFromServer || (!categories || categories.length === 0)) {
      categories = this.fetchAllCategories();
      this.updateLocalCategories(categories);
    }

    return categories;
  }

  // #endregion Get Methods

  // #region Fetch Methods

  /**
   * Fetches a category from the server by its ID.
   * @param categoryId The ID of the category to fetch from the server 
   * @returns The category with the specified ID if found, otherwise null
   */
  fetchCategoryById(categoryId: number): CalendarEventCategory | null {
    let category: CalendarEventCategory | null = null;
    this.http.get<CalendarEventCategory>(`/api/categories/${categoryId}`).subscribe(
      (data: CalendarEventCategory) => { category = data; } 
    );

    return category;
  }

  /**
   * Fetches all categories from the server
   * @returns An array of all accessible CalendarEventCategory objects
   */
  private fetchAllCategories(): Array<CalendarEventCategory> {
    let categories: Array<CalendarEventCategory> = [];
    this.http.get<Array<CalendarEventCategory>>(`api/categories`).subscribe(
      (data: Array<CalendarEventCategory>) => { categories = data; }
    );

    return categories;
  }

  /**
   * Fetches categories associated with a specific objective from the server
   * @param objectiveId The ID of the objective to retrieve the categories for
   * @returns An array of categories associated with the specified objective. An empty array if none found.
   */
  private fetchCategoriesByObjectiveId(objectiveId: number): Array<CalendarEventCategory> {
    let categories: Array<CalendarEventCategory> = [];
    this.http.get<Array<CalendarEventCategory>>(`/api/categories?objectiveId=${objectiveId}`).subscribe(
      (data: Array<CalendarEventCategory>) => { categories = data; }
    );

    return categories;
  }

  // #endregion Fetch Methods

  // #region Update Methods

  /**
   * Updates a category on the server and updates the local cache if successful.
   * @param category The Category to update
   * @returns The updated category if the update was successful, otherwise null
   */
  private updateCategory(category: CalendarEventCategory): CalendarEventCategory | null {
    let updatedCategory: CalendarEventCategory | null = null;
    this.http.put<CalendarEventCategory>(`/api/categories/${category.id}`, category).subscribe(
      (data: CalendarEventCategory) => { updatedCategory = data; }
    );

    if (updatedCategory) {
      this.updateLocalCategories([updatedCategory]);
    }

    return updatedCategory;
  }

  // #endregion Update Methods

  // #region Delete Methods

  /**
   * Deletes a category from the server and updates the local cache if successful
   * @param categoryId The ID of the category to delete
   * @returns A boolean indicating whether the deletion was successful
   */
  private deleteCategory(categoryId: number): boolean {
    let isDeleted: boolean = false;

    this.http.delete(`/api/categories/${categoryId}`).subscribe(
      () => { isDeleted = true; }
    );

    this.updateLocalCategories(undefined, [{ id: categoryId, name: '', color: '', objectiveId: 0 }]);

    return isDeleted;
  }

  // #endregion Delete Methods

  // #region Helper Methods

  /**
   * Updates the local cache of categories
   * @param categoriesToAdd  The categories to add to the local cache by ID
   * @param categoriesToRemove The categories to remove from local cache by ID
   */
  private updateLocalCategories(categoriesToAdd?: Array<CalendarEventCategory>, categoriesToRemove?: Array<CalendarEventCategory>): void {
    // Removal done first -> prioritize retaining information
    if (categoriesToRemove) {
      for (const category of categoriesToRemove) {
        this.categories.delete(category.id);
      }
    }
    
    if (categoriesToAdd) {
      for (const category of categoriesToAdd) {
        this.categories.set(category.id, category);
      }
    }
  }

  // #endregion Helper Methods
}
