import {Component, Input, OnInit} from '@angular/core';
import {
  RoomTypeServicesService
} from "../../../../../../../shared/services/roomTypesServices/room-type-services.service";
import {
  SupplementServicesService
} from "../../../../../../../shared/services/supplementServices/supplement-services.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-select-details',
  templateUrl: './select-details.component.html',
  styleUrls: ['./select-details.component.scss']
})
export class SelectDetailsComponent implements OnInit {

  @Input() contractId : any;
  constructor(
    private roomTypeServicesService: RoomTypeServicesService,
    private supplementServicesService: SupplementServicesService,
    private route: ActivatedRoute
  ) {}

  protected roomTypesDetails: any;
  protected supplementsDetails: any;
  checkInDate: any;
  checkOutDate: any;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn']
      this.checkOutDate = params['checkOut']
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
