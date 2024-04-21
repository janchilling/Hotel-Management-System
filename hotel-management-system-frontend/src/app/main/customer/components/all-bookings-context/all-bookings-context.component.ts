import {Component, OnInit} from '@angular/core';
import {BookingServiceService} from "../../../../shared/services/bookingService/booking-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-bookings-context',
  templateUrl: './all-bookings-context.component.html',
  styleUrls: ['./all-bookings-context.component.scss']
})
export class AllBookingsContextComponent implements OnInit{

  allBookings: any;
  userId: any;

  constructor(
    private bookingService :BookingServiceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")
    this.bookingService.getBookingsByCustomer(this.userId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.allBookings = response.data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  viewBookingDetails(bookingId: number) {
    this.router.navigate(['/main/booking', bookingId]);
  }

}
