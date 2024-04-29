import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MainBookingServicesService} from "../../shared/services/mainBookingService/main-booking-services.service";

@Component({
  selector: 'app-all-bookings-context',
  templateUrl: './all-bookings-context.component.html',
  styleUrls: ['./all-bookings-context.component.scss']
})
export class AllBookingsContextComponent implements OnInit{

  allBookings: any;
  userId: any;

  constructor(
    private bookingService :MainBookingServicesService,
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
