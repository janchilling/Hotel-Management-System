import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  RoomTypeServicesService
} from "../../../../../../../shared/services/roomTypesServices/room-type-services.service";
import {
  SupplementServicesService
} from "../../../../../../../shared/services/supplementServices/supplement-services.service";
import {ActivatedRoute} from "@angular/router";
import { BookingDataServiceService } from 'src/app/shared/services/bookingDataService/booking-data-service.service';
import {DiscountServicesService} from "../../../../../../../shared/services/discountServices/discount-services.service";

@Component({
  selector: 'app-select-details',
  templateUrl: './select-details.component.html',
  styleUrls: ['./select-details.component.scss']
})
export class SelectDetailsComponent implements OnInit {

  @Output() selectDetailsChanged = new EventEmitter<any>();
  @Input() contractId : any;
  selectedRoomData: any = {
    bookingRooms: [],
    bookingSupplements: [],
    discount: null
  };
  protected roomTypesDetails: any;
  protected supplementsDetails: any;
  protected discountDetails: any;
  checkInDate: any;
  checkOutDate: any;
  discountCode: string = '';

  constructor(
    private roomTypeServicesService: RoomTypeServicesService,
    private supplementServicesService: SupplementServicesService,
    private discountServicesService :DiscountServicesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'];
      this.checkOutDate = params['checkOut'];
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
    this.roomTypeServicesService.getRoomsByContractId(contractId).subscribe(
      (response) => {
        this.roomTypesDetails = response.data;
        console.log(this.roomTypesDetails);
      },
      (error) => {
        console.error('Error fetching room types:', error);
      }
    );
  }

  fetchSupplements(contractId: number) {
    this.supplementServicesService.getSupplementsByContractId(contractId).subscribe(
      (response) => {
        this.supplementsDetails = response.data;
        console.log(this.supplementsDetails)
      },
      (error) => {
        // Handle error
        console.error('Error fetching supplements:', error);
      }
    );
  }

  fetchDiscounts(contractId: number) {
    this.discountServicesService.getDiscounts(contractId).subscribe(
      (response) => {
        this.discountDetails = response;
        console.log(this.discountDetails)
      },
      (error) => {
        // Handle error
        console.error('Error fetching supplements:', error);
      }
    );
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
        // Apply the discount percentage to the selected room data
        this.selectedRoomData.discount = {
          discountCode: discount.discountCode,
          discountId: discount.discountId,
          discountPercentage: seasonDiscount.discountPercentage
        };
      } else {
        // If no applicable discount for the season, apply default discount
        this.selectedRoomData.discount = {
          discountCode: null,
          discountName: null,
          discountPercentage: null
        };
      }
    } else {
      // If discount code is not valid, remove it from selected room data
      this.selectedRoomData.discount = null;
    }

    // Emit the updated selected room data
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
          // Remove associated supplements if the number of rooms is 0
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
}

