import { TestBed } from '@angular/core/testing';

import { CalendarEventObjectiveService } from './calendar-event-objective-service';

describe('CalendarEventObjectiveService', () => {
  let service: CalendarEventObjectiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarEventObjectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
