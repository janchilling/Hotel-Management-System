import { Component } from '@angular/core';

@Component({
  selector: 'app-create-booking-context',
  templateUrl: './create-booking-context.component.html',
  styleUrls: ['./create-booking-context.component.scss']
})
export class CreateBookingContextComponent {

  isBookingDetailsVisible: boolean = true;
  isPaymentVisible: boolean = false;

  constructor() {
  }
  showBookingDetails() {
    this.isBookingDetailsVisible = true;
    this.isPaymentVisible = false;
  }

  showPayment() {
    this.isBookingDetailsVisible = false;
    this.isPaymentVisible = true;
  }
}
