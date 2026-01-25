import { TestBed } from '@angular/core/testing';

import { CalendarEventCategoryService } from './calendar-event-category-service';

describe('CalendarEventCategoryService', () => {
  let service: CalendarEventCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarEventCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
