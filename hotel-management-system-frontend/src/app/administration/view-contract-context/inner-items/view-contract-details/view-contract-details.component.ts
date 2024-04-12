import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contractDetailsForm = this.formBuilder.group({
      contractId: [''],
      startDate: [''],
      endDate: [''],
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
      // Patch the form values
      this.contractDetailsForm.patchValue(this.contractDetails);
      // Disable form controls
      this.contractDetailsForm.disable();
    }
  }

  handleUpdate(contractID: number) {
    // Handle update logic
  }


}
