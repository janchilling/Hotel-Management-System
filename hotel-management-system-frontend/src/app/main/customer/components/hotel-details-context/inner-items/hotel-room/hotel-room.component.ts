import { Component, Input, OnInit } from '@angular/core';
import { RoomTypeServicesService } from '../../../../../../shared/services/roomTypesServices/room-type-services.service';
import { SupplementServicesService } from '../../../../../../shared/services/supplementServices/supplement-services.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hotel-room',
  templateUrl: './hotel-room.component.html',
  styleUrls: ['./hotel-room.component.scss']
})
export class HotelRoomComponent implements OnInit {
  @Input() contractId: any;
  roomTypesDetails: any;
  supplementsDetails: any;
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
    this.roomTypeServicesService.getRoomsByContractId(contractId).subscribe({
        next: (response) => {
          if (response.statusCode === 200) {
            this.roomTypesDetails = response.data;
            console.log(this.roomTypesDetails);
            this.checkLoadingState();
          } else {
            console.error('Error fetching room types:', response.message);
            this.loading = false;
            this.error = true;
          }
        },
        error: (error) => {
          console.error('Error fetching room types:', error);
          this.loading = false;
          this.error = true;
        }
      }
    );
  }

  fetchSupplements(contractId: number) {
    this.supplementServicesService.getSupplementsByContractId(contractId).subscribe({
        next: (response) => {
          if (response.statusCode === 200) {
            this.supplementsDetails = response.data;
            console.log(this.supplementsDetails)
            this.checkLoadingState();
          } else {
            console.error('Error fetching supplements:', response.message);
            this.loading = false;
            this.error = true;
          }
        },
        error: (error) => {
          console.error('Error fetching supplements:', error);
          this.loading = false;
          this.error = true;
        }
      }
    );
  }

  checkLoadingState() {
    if (this.roomTypesDetails && this.supplementsDetails) {
      this.loading = false;
    }
  }
}
