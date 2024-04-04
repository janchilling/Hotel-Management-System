import { Component, Input, OnInit } from '@angular/core';
import { RoomTypeServicesService } from '../../../../../shared/services/roomTypesServices/room-type-services.service';
import { SupplementServicesService } from '../../../../../shared/services/supplementServices/supplement-services.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hotel-room',
  templateUrl: './hotel-room.component.html',
  styleUrls: ['./hotel-room.component.scss']
})
export class HotelRoomComponent implements OnInit {
  @Input() contractId: any;
  protected roomTypesDetails: any;
  protected supplementsDetails: any;
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  checkInDateFormatted: any;
  checkOutDateFormatted: any;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private roomTypeServicesService: RoomTypeServicesService,
    private supplementServicesService: SupplementServicesService,
    private route: ActivatedRoute
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
    } else {
      console.error('ContractId not provided.');
    }
  }

  fetchRoomTypes(contractId: number) {
    this.roomTypeServicesService.getRoomsByContractId(contractId).subscribe(
      (response) => {
        this.roomTypesDetails = response.data;
        console.log(this.roomTypesDetails);
        this.loading = false; // Set loading to false when data is loaded
      },
      (error) => {
        console.error('Error fetching room types:', error);
        this.loading = false; // Set loading to false in case of error
      }
    );
  }

  fetchSupplements(contractId: number) {
    this.supplementServicesService.getSupplementsByContractId(contractId).subscribe(
      (response) => {
        this.supplementsDetails = response.data;
        console.log(this.supplementsDetails)
        this.loading = false; // Set loading to false when data is loaded
      },
      (error) => {
        // Handle error
        console.error('Error fetching supplements:', error);
        this.loading = false; // Set loading to false in case of error
      }
    );
  }

}
