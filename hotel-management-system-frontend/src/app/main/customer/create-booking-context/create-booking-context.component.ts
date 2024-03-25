import {Component, OnInit} from '@angular/core';
import {HotelDetailsByIdService} from "../../../shared/services/hotelDetailsById/hotel-details-by-id.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-booking-context',
  templateUrl: './create-booking-context.component.html',
  styleUrls: ['./create-booking-context.component.scss']
})
export class CreateBookingContextComponent implements OnInit {

  hotelId: any;
  hotelDetails: any;
  isBookingDetailsVisible: boolean = true;
  isPaymentVisible: boolean = false;

  constructor(
    private hotelDetailsByIdService: HotelDetailsByIdService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the hotel ID from the URL path
    // this.hotelId = +this.route.snapshot.params['hotelId'];
    this.route.queryParams.subscribe(params => {
      // this.checkInDate = params['checkIn'];
      // this.checkOutDate = params['checkOut'];
      this.hotelId = params['hotelId'];
    });

    this.fetchHotelDetails();
  }

  fetchHotelDetails() {
    this.hotelDetailsByIdService.getHotelDetailsById(this.hotelId).subscribe(
      (response) => {
        this.hotelDetails = response;
        this.hotelDetails = this.hotelDetails.data
        console.log(this.hotelDetails)
      },
      (error) => {
        // Handle error
        console.error('Error fetching hotel details:', error);
      }
    );
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
