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
  contractId: any;
  contactDetails: any;
  bookingRooms: any;
  bookingSupplements: any;
  discount: any;

  constructor(
    private hotelDetailsByIdService: HotelDetailsByIdService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
        this.hotelDetails = this.hotelDetails.data;
        this.contractId = this.hotelDetails.contractId;
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

  handlePurchaseClicked(data: any) {

    this.contactDetails = data.contactDetails;
    this.bookingRooms = data.bookingRooms;
    this.bookingSupplements = data.bookingSupplements;
    this.discount = data.discount;
    console.log(this.discount)
    this.isBookingDetailsVisible = false;
    this.isPaymentVisible = true;
  }

  showPayment() {
    this.isBookingDetailsVisible = false;
    this.isPaymentVisible = true;
  }
}
