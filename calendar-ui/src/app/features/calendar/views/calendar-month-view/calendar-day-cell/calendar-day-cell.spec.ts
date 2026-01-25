import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayCell } from './calendar-day-cell';

describe('CalendarDayCell', () => {
  let component: CalendarDayCell;
  let fixture: ComponentFixture<CalendarDayCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDayCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDayCell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
