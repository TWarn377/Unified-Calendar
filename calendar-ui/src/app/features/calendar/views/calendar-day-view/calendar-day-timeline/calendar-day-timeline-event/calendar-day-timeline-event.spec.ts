import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayTimelineEvent } from './calendar-day-timeline-event';

describe('CalendarDayTimelineEvent', () => {
  let component: CalendarDayTimelineEvent;
  let fixture: ComponentFixture<CalendarDayTimelineEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDayTimelineEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDayTimelineEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
