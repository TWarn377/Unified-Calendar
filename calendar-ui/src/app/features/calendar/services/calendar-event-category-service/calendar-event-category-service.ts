import { Injectable } from '@angular/core';
import { CalendarEventCategory } from '../../models/calendar-event.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import ServiceDataSource from '../../enums/DataSource';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventCategoryService {
  constructor(private http: HttpClient) {}

  /**
   * Cached CalendarEventCategory objects.
   * This is a Map since the user determines the number of Categories.
   */
  private categories$: BehaviorSubject<Map<number, CalendarEventCategory>> = new BehaviorSubject<Map<number, CalendarEventCategory>>(new Map());

  // #region Refresh Methods

  // #end 

  // #region Get Methods

  /**
   * Gets a category by its ID.
   * @param categoryId The ID of the category to retrieve
   * @param [source=ServiceDataSource.Cache] The source to retrieve the category. If external, the local cache will be updated.
   * @returns The category with the specified ID.
   */
  public getCategoryById(categoryId: number, source: ServiceDataSource = ServiceDataSource.Cache): Observable<CalendarEventCategory | null> { 
    return source == ServiceDataSource.Cache ? 
      new Observable<CalendarEventCategory | null>((subscriber) => {
        subscriber.next(this.categories$.getValue().get(categoryId) ?? null);
        subscriber.complete();
      })
      : this.fetchCategoryById(categoryId);
  }

  /**
   * Gets all categories associated with a specific objective.
   * @param objectiveId The ID of the objective to retrieve categories for
   * @param [source=ServiceDataSource.Cache] The source to retrieve the categories. If external, the local cache will be updated.
   * @returns An array of accessible categories for the specific objective
   */
  public getCategoriesByObjectiveId(objectiveId: number, source: ServiceDataSource = ServiceDataSource.Cache): Observable<Array<CalendarEventCategory> | null> {
      switch (source) {
        case ServiceDataSource.Server:
          return this.fetchCategoriesByObjectiveId(objectiveId);
        case ServiceDataSource.Cache:
        default:
          return new Observable<Array<CalendarEventCategory>>((subscriber) => {
            subscriber.next([...this.categories$.getValue().values()]
              .filter(category => category.objectiveId == objectiveId)); 
            subscriber.complete();
          });
      }
  }

  /**
   * Gets all categories.
   * @param [source=ServiceDataSource.Cache] The source to retrieve the categories. If external, the local cache will be updated.
   * @returns Returns and array of all accessible CalendarEventCategory objects
   */
  public getAllCategories(source: ServiceDataSource = ServiceDataSource.Cache): Observable<Array<CalendarEventCategory>> {
    switch (source) {
      case ServiceDataSource.Server:
        return this.fetchAllCategories();
      case ServiceDataSource.Cache:
      default:
        return new Observable<Array<CalendarEventCategory>>((subscriber) => {
          subscriber.next([...this.categories$.getValue().values()]);
          subscriber.complete();
        });
    }
  }

  // #endregion Get Methods

  // #region Fetch Methods

  /**
   * Fetches a category from the server by its ID.
   * @param categoryId The ID of the category to fetch from the server 
   * @returns The category with the specified ID if found, otherwise null
   */
  fetchCategoryById(categoryId: number): Observable<CalendarEventCategory | null> {
    return this.http.get<CalendarEventCategory>(`/api/categories/${categoryId}`).pipe(
      tap((category: CalendarEventCategory) => this.updateLocalCategories([category])));
  }

  /**
   * Fetches all categories from the server
   * @returns An array of all accessible CalendarEventCategory objects
   */
  private fetchAllCategories(): Observable<Array<CalendarEventCategory>> {
    return this.http.get<Array<CalendarEventCategory>>(`api/categories`).pipe(
      tap((categories: Array<CalendarEventCategory>) => this.updateLocalCategories(categories))
    );
  }

  /**
   * Fetches categories associated with a specific objective from the server
   * @param objectiveId The ID of the objective to retrieve the categories for
   * @returns An array of categories associated with the specified objective. An empty array if none found.
   */
  private fetchCategoriesByObjectiveId(objectiveId: number): Observable<Array<CalendarEventCategory>> {
    return this.http.get<Array<CalendarEventCategory>>(`/api/categories?objectiveId=${objectiveId}`).pipe(
      tap((categories: Array<CalendarEventCategory>) => this.updateLocalCategories(categories))
    );
  }

  // #endregion Fetch Methods

  // #region Update Methods

  /**
   * Updates a category on the server and updates the local cache if successful.
   * @param category The Category to update
   * @returns The updated category if the update was successful, otherwise null
   */
  private updateCategory(category: CalendarEventCategory): Observable<CalendarEventCategory | null> {
    return this.http.put<CalendarEventCategory>(`/api/categories/${category.id}`, category).pipe(
      tap((category: CalendarEventCategory) => this.updateLocalCategories([category])));
  }

  // #endregion Update Methods

  // #region Delete Methods

  /**
   * Deletes a category from the server and updates the local cache if successful
   * @param categoryId The ID of the category to delete
   * @returns A boolean indicating whether the deletion was successful
   */
  private deleteCategory(categoryId: number): Observable<boolean> {
    return this.http.delete<boolean>(`/api/categories/${categoryId}`).pipe(
      tap(() => this.updateLocalCategories(undefined, [categoryId])),
      map(() => true));
  }

  // #endregion Delete Methods

  // #region Helper Methods

  /**
   * Updates the local cache of categories
   * @param categoriesToAdd  The categories to add to the local cache by ID
   * @param categoryIdsToRemove The categories to remove from local cache by ID
   */
  private updateLocalCategories(categoriesToAdd?: Array<CalendarEventCategory>, categoryIdsToRemove?: Array<number>): void {
    const currentCategories = new Map(this.categories$.getValue());

    // Removal done first -> prioritize retaining information
    if (categoryIdsToRemove) {
      for (const categoryId of categoryIdsToRemove) {
        currentCategories.delete(categoryId);
      }
    }
    
    if (categoriesToAdd) {
      for (const category of categoriesToAdd) {
        currentCategories.set(category.id, category);
      }
    }

    this.categories$.next(currentCategories);
  }

  // #endregion Helper Methods
}
