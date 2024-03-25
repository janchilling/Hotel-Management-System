import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPaymentComponent } from './booking-payment.component';

describe('BookingPaymentComponent', () => {
  let component: BookingPaymentComponent;
  let fixture: ComponentFixture<BookingPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingPaymentComponent]
    });
    fixture = TestBed.createComponent(BookingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
