import {Component, OnInit} from '@angular/core';
import {catchError, throwError, timeout} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ContractServicesService} from "../../../shared/services/contractServices/contract-services.service";

@Component({
  selector: 'app-view-contract-context',
  templateUrl: './view-contract-context.component.html',
  styleUrls: ['./view-contract-context.component.scss']
})
export class ViewContractContextComponent implements OnInit{

  contractId: any
  contractDetails: any
  isLoading: boolean = false
  isError: boolean = false

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractServicesService) {
  }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.params['contractId'];
    this.fetchContractDetails()
  }

  fetchContractDetails() {
    this.isLoading = true;
    this.contractService.getContractsById(this.contractId).pipe(
      timeout(30000),
      catchError(error => {
        this.isError = true;
        this.isLoading = false;
        return throwError(() => error);
      })
    ).subscribe({
      next: (response: any) => {
        console.log(response)
        if (response.statusCode === 200) {
          this.contractDetails = response.data;
          this.isLoading = false;
        } else {
          console.error('Error fetching hotel details:', response.message);
          this.isError = true;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching hotel details:', error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }


}
