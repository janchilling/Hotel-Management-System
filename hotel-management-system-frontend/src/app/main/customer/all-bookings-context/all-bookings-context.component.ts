import {Component, OnInit} from '@angular/core';
import {BookingServiceService} from "../../../shared/services/bookingService/booking-service.service";

@Component({
  selector: 'app-all-bookings-context',
  templateUrl: './all-bookings-context.component.html',
  styleUrls: ['./all-bookings-context.component.scss']
})
export class AllBookingsContextComponent implements OnInit{

  allBookings: any;

  constructor(
    private bookingService :BookingServiceService) {
  }

  ngOnInit(): void {
    this.bookingService.getBookingsByCustomer(1).subscribe({
      next: (response: any) => {
        console.log(response);
        this.allBookings = response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
