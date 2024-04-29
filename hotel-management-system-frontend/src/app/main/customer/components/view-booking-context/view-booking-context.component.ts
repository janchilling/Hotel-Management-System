import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MainBookingServicesService} from "../../shared/services/mainBookingService/main-booking-services.service";

@Component({
  selector: 'app-view-booking-context',
  templateUrl: './view-booking-context.component.html',
  styleUrls: ['./view-booking-context.component.scss']
})
export class ViewBookingContextComponent implements OnInit {

  bookingDetails: any;
  bookingId: any;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private bookingService: MainBookingServicesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.bookingId = +this.route.snapshot.params['bookingId'];
    // this.fetchBookingDetails();
  }

  fetchBookingDetails() {
    this.isLoading = true;
    this.bookingService.getBookingsByBookingId(this.bookingId).subscribe({
      next: (response: any) => {
        if(response.statusCode == 200){
          console.log(response);
          this.bookingDetails = response.data;
          this.isLoading = false;
        }else{
          this.isLoading = false;
          this.isError = true;
        }
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.isError = true;
      }
    });
  }

}
