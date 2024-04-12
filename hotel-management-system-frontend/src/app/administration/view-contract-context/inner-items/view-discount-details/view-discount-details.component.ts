import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.discountDetailsForm = this.formBuilder.group({
      discountDetails: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.contractDetails) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.discountDetailsForm = this.formBuilder.group({
      discountDetails: this.formBuilder.array([])
    });

    const discountDetailsArray = this.discountDetailsForm.get('discountDetails') as FormArray;
    this.contractDetails.discounts.forEach((discount: any) => {
      const discountGroup = this.formBuilder.group({
        discountId: [discount.discountId],
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

  getDiscountFormGroup(index: number): FormGroup {
    return (this.discountDetailsForm.get('discountDetails') as FormArray).at(index) as FormGroup;
  }

  getSeasonDiscounts(discountIndex: number): FormArray {
    return this.getDiscountFormGroup(discountIndex).get('seasonDiscounts') as FormArray;
  }

  handleUpdate(contractID: number) {
    // Handle update logic
  }


}
