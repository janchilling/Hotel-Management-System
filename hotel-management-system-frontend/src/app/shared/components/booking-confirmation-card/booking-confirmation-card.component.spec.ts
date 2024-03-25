import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConfirmationCardComponent } from './booking-confirmation-card.component';

describe('BookingConfirmationCardComponent', () => {
  let component: BookingConfirmationCardComponent;
  let fixture: ComponentFixture<BookingConfirmationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingConfirmationCardComponent]
    });
    fixture = TestBed.createComponent(BookingConfirmationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
