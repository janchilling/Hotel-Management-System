import {Component, OnInit} from '@angular/core';
import {BookingServiceService} from "../../../shared/services/bookingService/booking-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-booking-context',
  templateUrl: './view-booking-context.component.html',
  styleUrls: ['./view-booking-context.component.scss']
})
export class ViewBookingContextComponent implements OnInit {

  bookingDetails: any;
  bookingId: any;
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private bookingService: BookingServiceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.bookingId = +this.route.snapshot.params['bookingId'];
    this.fetchBookingDetails();
  }

  fetchBookingDetails() {
    this.loading = true;
    this.bookingService.getBookingsByBookingId(this.bookingId).subscribe({
      next: (response: any) => {
        if(response.statusCode == 200){
          console.log(response);
          this.bookingDetails = response.data;
          this.loading = false;
        }else{
          this.loading = false;
          this.error = true;
        }
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.error = true;
      }
    });
  }

}
