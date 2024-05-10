import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from "rxjs";
import {
  AuthenticationServicesService
} from "../../../../../security/services/authenticationServices/authentication-services.service";
import {CustomerServicesService} from "../../../../../shared/services/customerServices/customer-services.service";
import {MainBookingServicesService} from "../../services/mainBookingService/main-booking-services.service";

@Component({
  selector: 'app-booking-confirmation-card',
  templateUrl: './booking-confirmation-card.component.html',
  styleUrls: ['./booking-confirmation-card.component.scss']
})
export class BookingConfirmationCardComponent implements OnInit {

  @Input() isViewBookingContext: any;
  @Input() bookingId: any;
  bookingDetails: any;
  rooms: any;
  supplements: any;
  discounts: any;
  bookedDate: any;
  checkInDate: any;
  checkOutDate: any;
  payment: any;
  customer: any;
  userId: any;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private authenticationService: AuthenticationServicesService,
    private customerService: CustomerServicesService,
    private bookingService: MainBookingServicesService,
  ) {}

  ngOnInit(): void {
    this.userId = this.authenticationService.getUserId();
    this.fetchBookingDetailsAndOtherDetails();
  }

  fetchBookingDetailsAndOtherDetails() {
    this.isLoading = true;
    this.bookingService.getBookingsByBookingId(this.bookingId).pipe(
      switchMap((response: any) => {
        if (response.statusCode === 200) {
          this.bookingDetails = response.data;
          this.rooms = this.bookingDetails?.rooms;
          this.supplements = this.bookingDetails?.supplements;
          this.discounts = this.bookingDetails?.discounts;
          this.payment = this.bookingDetails?.payment[0];
          this.bookedDate = new Date(this.bookingDetails?.bookingDate).toDateString();
          this.checkInDate = new Date(this.bookingDetails?.checkInDate).toDateString();
          this.checkOutDate = new Date(this.bookingDetails?.checkOutDate).toDateString();
          return this.customerService.getCustomerById(this.userId);
        } else {
          throw new Error('Invalid response');
        }
      })
    ).subscribe({
      next: (customerResponse: any) => {
        if (customerResponse.statusCode === 200) {
          this.customer = customerResponse.data;
          console.log(this.customer);
        } else {
          console.log(customerResponse);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.isError = true;
      }
    });
  }
}
