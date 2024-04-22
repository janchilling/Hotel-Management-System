import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {DiscountServicesService} from "../../../../../shared/services/discountServices/discount-services.service";
import {
  ConfirmationDialogComponentComponent
} from "../../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-discount-details',
  templateUrl: './view-discount-details.component.html',
  styleUrls: ['./view-discount-details.component.scss']
})
export class ViewDiscountDetailsComponent implements OnInit {

  @Input() contractDetails: any;
  discountDetailsForm!: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;
  editable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.discountDetailsForm = this.formBuilder.group({
      discountDetails: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.contractDetails) {
      this.initializeForm();
      this.disableForm();
    }
  }

  initializeForm() {
    const discountDetailsArray = this.discountDetailsForm.get('discountDetails') as FormArray;
    this.contractDetails.discounts.forEach((discount: any) => {
      const discountGroup = this.formBuilder.group({
        discountId: [{ value: discount.discountId, disabled: true }],
        discountCode: [discount.discountCode],
        discountDescription: [discount.discountDescription],
        discountName: [discount.discountName],
        seasonDiscounts: this.initializeSeasonDiscounts(discount.seasonDiscounts)
      });
      discountDetailsArray.push(discountGroup);
    });
  }

  initializeSeasonDiscounts(seasonDiscounts: any[]) {
    const seasonDiscountsArray = this.formBuilder.array([]);
    seasonDiscounts.forEach((seasonDiscount: any) => {
      const seasonDiscountGroup = this.formBuilder.group({
        discountPercentage: [seasonDiscount.discountPercentage],
        seasonId: [seasonDiscount.seasonId],
        seasonName: [seasonDiscount.seasonName]
      });
      (seasonDiscountsArray as FormArray).push(seasonDiscountGroup);
    });
    return seasonDiscountsArray;
  }

  enableEditableFields() {
    const discountDetailsArray = this.discountDetailsForm.get('discountDetails') as FormArray;
    discountDetailsArray.controls.forEach((control: AbstractControl<any>) => {
      if (control instanceof FormGroup) {
        control.get('discountName')?.enable();
        control.get('discountDescription')?.enable();
        control.get('discountCode')?.enable();
        control.get('seasonDiscounts')?.enable();
      }
    });
  }

  disableForm() {
    this.discountDetailsForm.disable();
  }

  handleUpdate() {
    const resource = 'discount';
    if (this.contractDetails && this.contractDetails.contractId) {
      const contractId = this.contractDetails.contractId;
      this.router.navigate([`/administration/update/${contractId}`], { queryParams: { resource } });
    } else {
      console.error('Contract details or contractId is missing.');
    }
  }
}
