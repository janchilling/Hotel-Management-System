import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view-season-details',
  templateUrl: './view-season-details.component.html',
  styleUrls: ['./view-season-details.component.scss']
})
export class ViewSeasonDetailsComponent implements OnInit{

  @Input() contractDetails: any;
  seasonDetailsForm!: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.seasonDetailsForm = this.formBuilder.group({
      seasonDetails: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    if (this.contractDetails) {
      this.initializeForm();
    }
  }

  initializeForm() {
    const seasonDetailsArray = this.seasonDetailsForm.get('seasonDetails') as FormArray;
    this.contractDetails.seasons.forEach((season: any) => {
      const seasonGroup = this.formBuilder.group({
        seasonId: [season.seasonId],
        startDate: [season.startDate],
        endDate: [season.endDate],
        seasonName: [season.seasonName]
      });
      seasonDetailsArray.push(seasonGroup);
    });
    this.seasonDetailsForm.disable();
  }

  handleUpdate(contractID: number) {
    // Handle update logic
  }
}
