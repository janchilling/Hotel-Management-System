import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {DiscountServicesService} from "../../../../shared/services/discountServices/discount-services.service";
import {
  ConfirmationDialogComponentComponent
} from "../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
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
    private discountService: DiscountServicesService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
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
    this.editable = true;
    this.enableEditableFields();
  }

  handleConfirmUpdate() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to submit?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleUpdate();
      }
    });
  }

  sendData() {
    const updatedDiscounts = this.discountDetailsForm.value.discountDetails;

    // Call service to update discounts
    this.discountService.updateDiscounts(updatedDiscounts).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          this.snackBar.open('Discounts updated successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
          this.router.navigate([this.router.url]);
        } else {
          console.log(response);
        }
      },
      error: (error) => {
        // Handle error
        console.error('Error updating discounts:', error);
      }
    });
  }
}
