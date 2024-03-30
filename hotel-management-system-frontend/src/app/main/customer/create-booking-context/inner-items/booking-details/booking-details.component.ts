import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() selectedRoomData: any = {
    bookingRooms: [],
    bookingSupplements: []
  };
  @Output() purchaseClicked = new EventEmitter<any>();

  constructor(
  ) {
  }

  purchase() {
    this.purchaseClicked.emit({ contactDetails: this.contactDetails, bookingRooms: this.selectedRoomData.bookingRooms, bookingSupplements: this.selectedRoomData.bookingSupplements });
  }

  handleContactDetailsChanged(contactDetails: any) {
    this.contactDetails = contactDetails;
  }

  handleSelectDetailsChanged(selectedRoomData: any) {
    this.selectedRoomData = selectedRoomData;
  }

}
