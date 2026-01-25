import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthView } from './calendar-month-view';

describe('CalendarMonthView', () => {
  let component: CalendarMonthView;
  let fixture: ComponentFixture<CalendarMonthView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarMonthView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarMonthView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
