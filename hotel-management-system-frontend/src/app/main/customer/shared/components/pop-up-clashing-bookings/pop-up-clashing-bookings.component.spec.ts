import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpClashingBookingsComponent } from './pop-up-clashing-bookings.component';

describe('PopUpClashingBookingsComponent', () => {
  let component: PopUpClashingBookingsComponent;
  let fixture: ComponentFixture<PopUpClashingBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpClashingBookingsComponent]
    });
    fixture = TestBed.createComponent(PopUpClashingBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
