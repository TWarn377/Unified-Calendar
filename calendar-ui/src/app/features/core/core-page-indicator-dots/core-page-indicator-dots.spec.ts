import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorePageIndicatorDots } from './core-page-indicator-dots';

describe('CorePageIndicatorDots', () => {
  let component: CorePageIndicatorDots;
  let fixture: ComponentFixture<CorePageIndicatorDots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorePageIndicatorDots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorePageIndicatorDots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
