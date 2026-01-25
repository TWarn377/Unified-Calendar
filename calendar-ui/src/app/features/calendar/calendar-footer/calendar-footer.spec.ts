import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFooter } from './calendar-footer';

describe('CalendarFooter', () => {
  let component: CalendarFooter;
  let fixture: ComponentFixture<CalendarFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
