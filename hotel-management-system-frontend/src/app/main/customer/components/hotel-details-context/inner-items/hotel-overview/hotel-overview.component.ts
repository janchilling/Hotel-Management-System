import {Component, Input} from '@angular/core';
import {catchError, throwError, timeout} from "rxjs";
import {ContractServicesService} from "../../../../../../shared/services/contractServices/contract-services.service";
import {
  PopUpAvailabilityFormComponent
} from "../../../../../../shared/components/pop-up-availability-form/pop-up-availability-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-hotel-overview',
  templateUrl: './hotel-overview.component.html',
  styleUrls: ['./hotel-overview.component.scss']
})
export class HotelOverviewComponent{

  @Input() contractId: any;
  @Input() hotelDetails: any;
  contractDetails: any;
  loading: boolean = true;
  error: boolean = false;
  isCollapseOneVisible: boolean = true;
  isCollapseTwoVisible: boolean = false;
  isCollapseThreeVisible: boolean = false;
  isCollapseFourVisible: boolean = false;
  rotationAngles: number[] = [0, 0, 0, 0];

  constructor(
    private contractService: ContractServicesService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.fetchContractDetails(this.contractId);
  }

  fetchContractDetails(contractId: number) {
    this.contractService.getContractsById(contractId).pipe(
      timeout(30000),
      catchError(error => {
        console.error('Error fetching Contract details:', error);
        this.error = true;
        this.loading = false;
        return throwError(() => error);
      })
    ).subscribe((response) => {
      if (response.statusCode === 200) {
        this.contractDetails = response.data;
      } else {
        this.error = true;
      }
      this.loading = false;
    });
  }

  toggleCollapse(collapseNumber: number) {
    switch (collapseNumber) {
      case 1:
        this.isCollapseOneVisible = !this.isCollapseOneVisible;
        break;
      case 2:
        this.isCollapseTwoVisible = !this.isCollapseTwoVisible;
        break;
      case 3:
        this.isCollapseThreeVisible = !this.isCollapseThreeVisible;
        break;
      case 4:
        this.isCollapseFourVisible = !this.isCollapseFourVisible;
        break;
      default:
        break;
    }
  }

  toggleRotation(index: number) {
    this.rotationAngles[index] = this.rotationAngles[index] === 0 ? -180 : 0;
  }

  openPopUpAvailabilityForm(){
    this.dialog.open(PopUpAvailabilityFormComponent, {
      width: '50vw',
      height: '45vh',
      panelClass: 'pop-up-carousel-dialog'
    });
  }

}
