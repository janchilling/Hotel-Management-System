import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  BookingDataServiceService
} from "../../../../../shared/services/bookingDataService/booking-data-service.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {

  @Input() contractId: any;
  @Input() selectedRoomData: any = {
    bookingRooms: [],
    bookingSupplements: []
  };
  @Output() purchaseClicked = new EventEmitter<any>()
  contactDetails: any;
  isPurchaseEnabled: boolean = false;
  totalGuestsAllowed: number = 0;

  constructor(private _snackBar: MatSnackBar) {}

  purchase() {
    if (this.isPurchaseEnabled) {
      this.purchaseClicked.emit({ contactDetails: this.contactDetails, bookingRooms: this.selectedRoomData.bookingRooms,
        bookingSupplements: this.selectedRoomData.bookingSupplements, discount: this.selectedRoomData.discount,
        noOfPersons: this.selectedRoomData.noOfPersons });
    } else {
      this.openSnackBar('Please select at least one room and provide all contact details.');
    }
  }

  handleContactDetailsChanged(contactDetails: any) {
    this.contactDetails = contactDetails;
    this.checkPurchaseEnabled();
  }

  handleSelectDetailsChanged(selectedRoomData: any) {
    this.selectedRoomData = selectedRoomData;
    this.updateTotalAllowedGuests()
    this.checkPurchaseEnabled();
  }

  checkPurchaseEnabled() {
    this.isPurchaseEnabled = this.selectedRoomData.bookingRooms.length > 0 && this.contactDetails && this.contactDetails.email
      && this.contactDetails.firstName && this.contactDetails.lastName && this.contactDetails.phoneNumber
      && this.selectedRoomData.noOfPersons;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  updateTotalAllowedGuests(){
    this.totalGuestsAllowed = 0;
    this.selectedRoomData.bookingRooms.forEach((bookingRoom: any) => {
      this.totalGuestsAllowed += bookingRoom.maxAdults * bookingRoom.noOfRooms
    })
  }

}
