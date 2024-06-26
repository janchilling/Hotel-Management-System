import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-supplements-details',
  templateUrl: './view-supplements-details.component.html',
  styleUrls: ['./view-supplements-details.component.scss']
})
export class ViewSupplementsDetailsComponent {

  @Input() contractDetails: any;
  supplementDetailsForm!: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.supplementDetailsForm = this.formBuilder.group({
      supplementDetails: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.contractDetails) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.supplementDetailsForm = this.formBuilder.group({
      supplementDetails: this.formBuilder.array([])
    });

    const supplementDetailsArray = this.supplementDetailsForm.get('supplementDetails') as FormArray;
    this.contractDetails.supplements.forEach((supplement: any) => {
      const supplementGroup = this.formBuilder.group({
        supplementId: [supplement.supplementId],
        supplementName: [supplement.supplementName],
        supplementDescription: [supplement.supplementDescription],
        seasonSupplements: this.initializeSeasonSupplements(supplement.seasonSupplements)
      });
      supplementDetailsArray.push(supplementGroup);
    });
  }

  initializeSeasonSupplements(seasonSupplements: any[]) {
    const seasonSupplementsArray = this.formBuilder.array([]);
    seasonSupplements.forEach((seasonSupplement: any) => {
      const seasonSupplementGroup = this.formBuilder.group({
        supplementPrice: [seasonSupplement.supplementPrice],
        seasonId: [seasonSupplement.seasonId],
        seasonName: [seasonSupplement.seasonName]
      });
      (seasonSupplementsArray as FormArray).push(seasonSupplementGroup);
    });
    return seasonSupplementsArray;
  }

  handleUpdate() {
    const resource = 'supplement';
    if (this.contractDetails && this.contractDetails.contractId) {
      const contractId = this.contractDetails.contractId;
      this.router.navigate([`/administration/update/${contractId}`], { queryParams: { resource } });
    } else {
      console.error('Contract details or contractId is missing.');
    }
  }

}
