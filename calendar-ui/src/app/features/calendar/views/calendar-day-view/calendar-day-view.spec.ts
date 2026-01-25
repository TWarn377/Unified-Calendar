import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayView } from './calendar-day-view';

describe('CalendarDayView', () => {
  let component: CalendarDayView;
  let fixture: ComponentFixture<CalendarDayView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDayView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDayView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
