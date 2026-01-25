import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekView } from './calendar-week-view';

describe('CalendarWeekView', () => {
  let component: CalendarWeekView;
  let fixture: ComponentFixture<CalendarWeekView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWeekView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWeekView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
