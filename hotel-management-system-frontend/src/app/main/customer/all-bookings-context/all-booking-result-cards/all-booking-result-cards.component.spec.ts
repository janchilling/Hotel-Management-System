import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingResultCardsComponent } from './all-booking-result-cards.component';

describe('AllBookingResultCardsComponent', () => {
  let component: AllBookingResultCardsComponent;
  let fixture: ComponentFixture<AllBookingResultCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBookingResultCardsComponent]
    });
    fixture = TestBed.createComponent(AllBookingResultCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
