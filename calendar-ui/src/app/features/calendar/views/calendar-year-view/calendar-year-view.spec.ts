import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarYearView } from './calendar-year-view';

describe('CalendarYearView', () => {
  let component: CalendarYearView;
  let fixture: ComponentFixture<CalendarYearView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarYearView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarYearView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
