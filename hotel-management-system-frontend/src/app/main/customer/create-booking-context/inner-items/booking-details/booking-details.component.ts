import {Component, Input} from '@angular/core';
import {
  BookingDataServiceService
} from "../../../../../shared/services/bookingDataService/booking-data-service.service";

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {

  @Input () contractId : any;
  contactDetails: any;

  constructor(
    private bookingDataService: BookingDataServiceService
  ) {
  }

  purchase() {
    console.log(this.contactDetails);
  }

  handleContactDetailsChanged(contactDetails: any) {
    this.contactDetails = contactDetails;
  }

}
