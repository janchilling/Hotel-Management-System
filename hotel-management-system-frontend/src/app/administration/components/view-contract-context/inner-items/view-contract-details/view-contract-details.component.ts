import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContractServicesService} from "../../../../../shared/services/contractServices/contract-services.service";
import { ConfirmationDialogComponentComponent } from "../../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-view-contract-details',
  templateUrl: './view-contract-details.component.html',
  styleUrls: ['./view-contract-details.component.scss']
})
export class ViewContractDetailsComponent implements OnInit{

  @Input() contractDetails: any
  contractDetailsForm: FormGroup;
  isLoading: boolean = false
  isError: boolean = false
  editable: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractServicesService,
    private dialog: MatDialog,
  ) {
    this.contractDetailsForm = this.formBuilder.group({
      contractId: [''],
      startDate: [''],
      endDate: [''],
      contractStatus: [''],
      hotelId: [''],
      balancePayment: [''],
      cancellationDeadline: [''],
      cancellationAmount: [''],
      prepayment: [''],
      hotelName: ['']
    });
  }
  ngOnInit(): void {
    if (this.contractDetails) {
      this.contractDetailsForm.patchValue(this.contractDetails);
      this.contractDetailsForm.disable();
    }
  }

  handleUpdate() {
    this.editable = true
    this.contractDetailsForm.enable();
  }

  handleConfirmUpdate(contractID: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to submit?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendUpdatedContract(contractID);
      }
    });
  }

  sendUpdatedContract(contractID: number): void {
    this.isLoading = true;
    this.contractService.updateContract(contractID, this.contractDetailsForm.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          this.contractDetailsForm.disable();
          this.editable = false;
          this.router.navigate([this.router.url]);
        } else {
          console.error('Error updating Contract:', response.message);
          this.isError = true;
        }
      },
      error: (error) => {
        console.error('Error updating Contract:', error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }


}
