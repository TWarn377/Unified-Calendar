import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreButton } from './core-button';

describe('CoreButton', () => {
  let component: CoreButton;
  let fixture: ComponentFixture<CoreButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
