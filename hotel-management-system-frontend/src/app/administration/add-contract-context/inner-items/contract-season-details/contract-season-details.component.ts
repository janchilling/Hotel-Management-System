import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractServicesService} from "../../../../shared/services/contractServices/contract-services.service";

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
    private router: Router
  ) {
    this.contractSeasonForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      contractStatus: ['Active', Validators.required],
      cancellationDeadline: ['', Validators.required],
      cancellationAmount: ['', Validators.required],
      prepayment: ['', Validators.required],
      balancePayment: ['', Validators.required],
      hotelId: [''] ,
      seasons: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hotelId = params['hotelId'];
    });
  }

  submitForm() {
    console.log("Clicked")
    if (this.contractSeasonForm.invalid) {
      return;
    }
    this.contractSeasonForm.patchValue({ hotelId: this.hotelId });

    const contractData = this.contractSeasonForm.value;
    this.contractServicesService.addContract(contractData).subscribe(
      (response) => {
        console.log('Contract added successfully:', response);
        this.router.navigate(['/administration/addMarkup'], { queryParams: { contractId: response.data.contractId } });
      },
      (error) => {
        console.error('Failed to add contract:', error);
        // Handle error, show error message, etc.
      }
    );
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
