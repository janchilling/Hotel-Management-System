import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view-supplements-details',
  templateUrl: './view-supplements-details.component.html',
  styleUrls: ['./view-supplements-details.component.scss']
})
export class ViewSupplementsDetailsComponent {

  @Input() contractDetails: any;
  seasonDiscountForm!: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.seasonDiscountForm = this.formBuilder.group({
      supplementDetails: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.contractDetails) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.seasonDiscountForm = this.formBuilder.group({
      supplementDetails: this.formBuilder.array([])
    });

    const supplementDetailsArray = this.seasonDiscountForm.get('supplementDetails') as FormArray;
    this.contractDetails.discounts.forEach((discount: any) => {
      const discountGroup = this.formBuilder.group({
        discountId: [discount.discountId],
        discountCode: [discount.discountCode],
        discountDescription: [discount.discountDescription],
        discountName: [discount.discountName],
        seasonDiscounts: this.initializeSeasonDiscounts(discount.seasonDiscounts)
      });
      supplementDetailsArray.push(discountGroup);
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
    return (this.seasonDiscountForm.get('supplementDetails') as FormArray).at(index) as FormGroup;
  }

  getSeasonDiscounts(discountIndex: number): FormArray {
    return this.getDiscountFormGroup(discountIndex).get('seasonDiscounts') as FormArray;
  }

  handleUpdate(contractID: number) {
    // Handle update logic
  }

}
