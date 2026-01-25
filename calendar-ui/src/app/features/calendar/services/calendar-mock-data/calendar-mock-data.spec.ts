import { TestBed } from '@angular/core/testing';
import { CalendarMockData } from './calendar-mock-data';

describe('CalendarMockData', () => {
  let service: CalendarMockData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarMockData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
