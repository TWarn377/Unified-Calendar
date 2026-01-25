import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekRow } from './calendar-week-row';

describe('CalendarWeekRow', () => {
  let component: CalendarWeekRow;
  let fixture: ComponentFixture<CalendarWeekRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWeekRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWeekRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
