import {Component, Input, OnInit} from '@angular/core';
import {
  AuthenticationServicesService
} from "../../../security/services/authenticationServices/authentication-services.service";
import {CustomerServicesService} from "../../services/customerServices/customer-services.service";

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
  customer: any;
  userId: any

  constructor(
    private authenticationService: AuthenticationServicesService,
    private customerService: CustomerServicesService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authenticationService.getUserId()
    this.rooms = this.bookingDetails.rooms
    this.supplements = this.bookingDetails.supplements
    this.discounts = this.bookingDetails.discounts
    this.payment = this.bookingDetails.payment[0]
    this.bookedDate = new Date(this.bookingDetails.bookingDate).toDateString();
    this.checkInDate = new Date(this.bookingDetails.checkInDate).toDateString();
    this.checkOutDate = new Date(this.bookingDetails.checkOutDate).toDateString();
    this.fetchCustomerDetails()
  }

  fetchCustomerDetails(){
    this.customerService.getCustomerById(this.userId).subscribe({
    next: (response) => {
      if(response.statusCode == 200){
        this.customer = response.data
        console.log(this.customer)
      }else {
        console.log(response)
      }
    },
    error: (error) => {
      console.log(error)
    }
    })
  }

}
