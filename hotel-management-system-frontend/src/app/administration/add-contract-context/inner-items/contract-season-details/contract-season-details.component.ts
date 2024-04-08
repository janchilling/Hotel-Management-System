import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractServicesService} from "../../../../shared/services/contractServices/contract-services.service";
import {
  ConfirmationDialogComponentComponent
} from "../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, matSnackBarAnimations} from "@angular/material/snack-bar";

@Component({
  selector: 'app-contract-season-details',
  templateUrl: './contract-season-details.component.html',
  styleUrls: ['./contract-season-details.component.scss']
})
export class ContractSeasonDetailsComponent implements OnInit {
  contractSeasonForm: FormGroup;
  hotelId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contractServicesService: ContractServicesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.contractSeasonForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      contractStatus: ['Active', Validators.required],
      cancellationDeadline: ['', Validators.required],
      cancellationAmount: ['', Validators.required],
      prepayment: ['', Validators.required],
      balancePayment: ['', Validators.required],
      seasons: this.fb.array([]),
      hotelId: ['']
    });
  }

  ngOnInit(): void {
    this.hotelId = +this.route.snapshot.params['hotelId'];
    console.log(this.hotelId)
  }

  submitForm() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to submit?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitMethod();
      }
    });
  }

  submitMethod() {
    if (this.contractSeasonForm.invalid) {
      return;
    }
    this.contractSeasonForm.patchValue({ hotelId: this.hotelId });

    const contractData = this.contractSeasonForm.value;
    console.log(contractData)
    this.contractServicesService.addContract(contractData).subscribe({
      next: (response) => {
        if(response.statusCode === 201) {
          console.log('Contract added successfully:', response);
          this.router.navigate(['/administration/addContractDetails'], { queryParams: { contractId: response.data.contractId } });
        }else if(response.statusCode === 409){
          this.snackBar.open('Contract Dates overlap', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }else{
          console.error('Failed to add contract:', response);
        }
        },
      error: (error) => {
        console.error('Failed to add contract:', error);
      }
    });

  }

  get f() {
    return this.contractSeasonForm.controls;
  }

  get seasonsArray() {
    return this.contractSeasonForm.get('seasons') as FormArray;
  }

  createSeason(): FormGroup {
    return this.fb.group({
      seasonName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  addSeason() {
    this.seasonsArray.push(this.createSeason());
  }

  removeSeason(index: number) {
    this.seasonsArray.removeAt(index);
  }
}
