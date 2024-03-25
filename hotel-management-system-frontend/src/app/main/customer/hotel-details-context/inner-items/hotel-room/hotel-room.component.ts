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

  constructor(
    private roomTypeServicesService: RoomTypeServicesService,
    private supplementServicesService: SupplementServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'] ? new Date(params['checkIn']) : undefined;
      this.checkOutDate = params['checkOut'] ? new Date(params['checkOut']) : undefined;
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
}
