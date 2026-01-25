import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTaskViewBanner } from './calendar-task-view-banner';

describe('CalendarTaskViewBanner', () => {
  let component: CalendarTaskViewBanner;
  let fixture: ComponentFixture<CalendarTaskViewBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarTaskViewBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarTaskViewBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
