import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayTimeline } from './calendar-day-timeline';

describe('CalendarDayTimeline', () => {
  let component: CalendarDayTimeline;
  let fixture: ComponentFixture<CalendarDayTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDayTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDayTimeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
