import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  RoomTypeServicesService
} from "../../../../../../../../shared/services/roomTypesServices/room-type-services.service";
import {
  SupplementServicesService
} from "../../../../../../../../shared/services/supplementServices/supplement-services.service";
import {ActivatedRoute} from "@angular/router";
import {DiscountServicesService} from "../../../../../../../../shared/services/discountServices/discount-services.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {
  PopUpAvailabilityFormComponent
} from "../../../../../../../../shared/components/pop-up-availability-form/pop-up-availability-form.component";

@Component({
  selector: 'app-select-details',
  templateUrl: './select-details.component.html',
  styleUrls: ['./select-details.component.scss']
})
export class SelectDetailsComponent implements OnInit {

  @Input() contractId : any;
  @Input() totalGuestsAllowed: any;
  @Output() selectDetailsChanged = new EventEmitter<any>();
  roomTypesDetails: any;
  supplementsDetails: any;
  discountDetails: any;
  checkInDate: any;
  checkOutDate: any;
  discountCode: string = '';
  selectedRoomData: any = {
    bookingRooms: [],
    bookingSupplements: [],
    discount: null,
    noOfPersons: null
  };
  isLoading: boolean = true;
  isError: boolean = false;
  invalidDiscountCode: boolean = false;
  guestsRequired: boolean = false;
  noOfPersons: number = 0;
  checkInDateFormatted: any;
  checkOutDateFormatted: any;

  constructor(
    private roomTypeServicesService: RoomTypeServicesService,
    private supplementServicesService: SupplementServicesService,
    private discountServicesService :DiscountServicesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'] ? new Date(params['checkIn']) : undefined;
      this.checkOutDate = params['checkOut'] ? new Date(params['checkOut']) : undefined;
      this.checkInDateFormatted = this.checkInDate?.toDateString();
      this.checkOutDateFormatted = this.checkOutDate?.toDateString();
    });

    if (this.contractId) {
      this.fetchRoomTypes(this.contractId);
      this.fetchSupplements(this.contractId);
      this.fetchDiscounts(this.contractId);
    } else {
      console.error('ContractId not provided.');
    }
  }

  fetchRoomTypes(contractId: number) {
    this.roomTypeServicesService.getRoomsByContractId(contractId).subscribe({
      next: (response) => {
        this.roomTypesDetails = response.data;
        console.log(this.roomTypesDetails);
        this.checkLoadingState();
      },
      error: (error) => {
        console.error('Error fetching room types:', error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  fetchSupplements(contractId: number) {
    this.supplementServicesService.getSupplementsByContractId(contractId).subscribe({
      next: (response) => {
        this.supplementsDetails = response.data;
        console.log(this.supplementsDetails);
        this.checkLoadingState();
      },
      error: (error) => {
        console.error('Error fetching supplements:', error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  fetchDiscounts(contractId: number) {
    this.discountServicesService.getDiscounts(contractId).subscribe({
      next: (response) => {
        this.discountDetails = response.data;
        console.log(this.discountDetails);
        this.checkLoadingState();
      },
      error: (error) => {
        console.error('Error fetching discounts:', error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  private checkLoadingState() {
    if (this.roomTypesDetails && this.supplementsDetails && this.discountDetails) {
      this.isLoading = false;
    }
  }

  applyDiscount(event: any) {
    const discountCode = event.target.value;
    const discount = this.discountDetails.find((discount: any) => discount.discountCode === discountCode);

    if (discount) {
      // Find the discount percentage based on the season
      const seasonDiscount = discount.seasonDiscounts.find((seasonDiscount: any) => {
        const startDate = new Date(seasonDiscount.startDate);
        const endDate = new Date(seasonDiscount.endDate);
        const checkInDate = new Date(this.checkInDate);
        const checkOutDate = new Date(this.checkOutDate);
        return checkInDate >= startDate && checkOutDate <= endDate;
      });

      if (seasonDiscount) {
        this.selectedRoomData.discount = {
          discountCode: discount.discountCode,
          discountId: discount.discountId,
          discountPercentage: seasonDiscount.discountPercentage
        };
      } else {
        this.selectedRoomData.discount = {
          discountCode: null,
          discountName: null,
          discountPercentage: null
        };
      }
      this.invalidDiscountCode = false;
    } else {
      this.invalidDiscountCode = true;
      this.selectedRoomData.discount = null;
    }
    this.selectDetailsChanged.emit(this.selectedRoomData);
  }

  receiveRoomSelection(selectedRoomData: any) {
    selectedRoomData.bookingRooms.forEach((selectedRoom: any) => {
      const existingRoomIndex = this.selectedRoomData.bookingRooms.findIndex((room: any) => room.roomTypeId === selectedRoom.roomTypeId);

      if (existingRoomIndex !== -1) {
        if (selectedRoom.noOfRooms > 0) {
          this.selectedRoomData.bookingRooms[existingRoomIndex] = { ...selectedRoom };
        } else {
          this.selectedRoomData.bookingRooms.splice(existingRoomIndex, 1);
          this.selectedRoomData.bookingSupplements = this.selectedRoomData.bookingSupplements.filter((supplement: any) => supplement.roomTypeId !== selectedRoom.roomTypeId);
        }
      } else if (selectedRoom.noOfRooms > 0) {
        this.selectedRoomData.bookingRooms.push({ ...selectedRoom });
      }
    });

    selectedRoomData.bookingSupplements.forEach((selectedSupplement: any) => {
      const existingSupplementIndex = this.selectedRoomData.bookingSupplements.findIndex((supplement: any) => supplement.supplementId === selectedSupplement.supplementId && supplement.roomTypeId === selectedSupplement.roomTypeId);

      if (existingSupplementIndex !== -1) {
        if (selectedSupplement.noOfRooms > 0) {
          this.selectedRoomData.bookingSupplements[existingSupplementIndex] = { ...selectedSupplement };
        } else {
          this.selectedRoomData.bookingSupplements.splice(existingSupplementIndex, 1);
        }
      } else if (selectedSupplement.noOfRooms > 0) {
        this.selectedRoomData.bookingSupplements.push({ ...selectedSupplement });
      }
    });

    this.selectDetailsChanged.emit(this.selectedRoomData);
  }

  validateGuests() {
    console.log(this.totalGuestsAllowed)
    if (this.noOfPersons <= 0) {
      this.guestsRequired = true;
      this.noOfPersons = 0;
    } else if (this.noOfPersons > this.totalGuestsAllowed) {
      this.snackBar.open('Increase rooms to add more guests.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.noOfPersons = this.totalGuestsAllowed;
    } else {
      this.guestsRequired = false;
      this.selectedRoomData.noOfPersons = this.noOfPersons;
    }
  }

  openPopUpAvailabilityForm(){
    this.dialog.open(PopUpAvailabilityFormComponent, {
      width: '50vw',
      height: '45vh',
      panelClass: 'pop-up-carousel-dialog'
    });
  }

}

