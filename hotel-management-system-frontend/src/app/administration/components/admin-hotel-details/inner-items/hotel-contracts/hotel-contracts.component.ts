import {Component, Input, OnInit} from '@angular/core';
import {ContractServicesService} from "../../../../../shared/services/contractServices/contract-services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotel-contracts',
  templateUrl: './hotel-contracts.component.html',
  styleUrls: ['./hotel-contracts.component.scss']
})
export class HotelContractsComponent implements OnInit {

  @Input() hotelId: any;
  contracts: any
  isLoading: boolean = false
  isError: boolean = false

  constructor(
    private contractService: ContractServicesService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchContract(this.hotelId)
  }

  fetchContract(hotelId: number) {
    this.isLoading = true
    this.contractService.getContractsByHotel(hotelId).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          this.contracts = response.data
        } else if (response.statusCode === 404) {

        } else {
          console.error('Error fetching hotel details:', response.message);
          this.isError = true;
        }
      },
      error: (error) => {
        console.error('Error fetching hotel details:', error);
      }
    })

  }

  handleView(contractId: number) {
    this.router.navigate(['/administration/contracts/', contractId])
  }

  addContract(hotelId: any) {
    this.router.navigate(['/administration/addContract', hotelId]);
  }

}
