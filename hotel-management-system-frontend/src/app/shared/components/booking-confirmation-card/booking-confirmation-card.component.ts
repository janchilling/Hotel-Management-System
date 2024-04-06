import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-booking-confirmation-card',
  templateUrl: './booking-confirmation-card.component.html',
  styleUrls: ['./booking-confirmation-card.component.scss']
})
export class BookingConfirmationCardComponent implements OnInit {

  @Input() bookingDetails: any;
  rooms: any;
  supplements: any;
  discounts: any;
  bookedDate: any;
  checkInDate: any;
  checkOutDate: any;
  payment: any;

  constructor() {
  }

  ngOnInit(): void {
    this.rooms = this.bookingDetails.rooms
    this.supplements = this.bookingDetails.supplements
    this.discounts = this.bookingDetails.discounts
    this.payment = this.bookingDetails.payment[0]
    this.bookedDate = new Date(this.bookingDetails.bookingDate).toDateString();
    this.checkInDate = new Date(this.bookingDetails.checkInDate).toDateString();
    this.checkOutDate = new Date(this.bookingDetails.checkOutDate).toDateString();

  }

}
