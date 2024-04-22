import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-markup-details',
  templateUrl: './view-markup-details.component.html',
  styleUrls: ['./view-markup-details.component.scss']
})
export class ViewMarkupDetailsComponent implements OnInit{

  @Input() contractDetails: any;
  markupDetailsForm!: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.markupDetailsForm = this.formBuilder.group({
      markupDetails: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.contractDetails) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.markupDetailsForm = this.formBuilder.group({
      markupDetails: this.formBuilder.array([])
    });

    const markupDetailsArray = this.markupDetailsForm.get('markupDetails') as FormArray;
    this.contractDetails.markups.forEach((markup: any) => {
      const markupGroup = this.formBuilder.group({
        markupId: [markup.markupId],
        seasonMarkups: this.initializeSeasonMarkups(markup.seasonMarkups)
      });
      markupDetailsArray.push(markupGroup);
    });
  }

  initializeSeasonMarkups(seasonMarkups: any[]) {
    const seasonMarkupsArray = this.formBuilder.array([]);
    seasonMarkups.forEach((seasonMarkup: any) => {
      const seasonDiscountGroup = this.formBuilder.group({
        markupPercentage: [seasonMarkup.markupPercentage],
        seasonId: [seasonMarkup.seasonId],
        seasonName: [seasonMarkup.seasonName]
      });
      (seasonMarkupsArray as FormArray).push(seasonDiscountGroup);
    });
    return seasonMarkupsArray;
  }

  handleUpdate() {
    const resource = 'markup';
    if (this.contractDetails && this.contractDetails.contractId) {
      const contractId = this.contractDetails.contractId;
      this.router.navigate([`/administration/update/${contractId}`], { queryParams: { resource } });
    } else {
      console.error('Contract details or contractId is missing.');
    }
  }

}
