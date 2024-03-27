import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractServicesService } from '../../../../shared/services/contractServices/contract-services.service';
import { SeasonServicesService } from '../../../../shared/services/seasonServices/season-services.service';
import {MarkupServicesService} from "../../../../shared/services/markupServices/markup-services.service";

@Component({
  selector: 'app-markup-details',
  templateUrl: './markup-details.component.html',
  styleUrls: ['./markup-details.component.scss']
})
export class MarkupDetailsComponent implements OnInit {
  markupForm: FormGroup;
  contractId: any;
  seasons: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private seasonServicesService: SeasonServicesService,
    private contractServicesService: ContractServicesService,
    private markupServicesService: MarkupServicesService
  ) {
    this.markupForm = this.fb.group({
      markups: this.fb.array([]) // Initialize as FormArray
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.contractId = params['contractId'];
    });
    this.loadSeasons();
  }

  loadSeasons() {
    this.seasonServicesService.getSeasonsByContractId(this.contractId).subscribe(
      (response) => {
        this.seasons = response;
        this.addMarkupControls(); // Add markup controls based on seasons
      },
      (error) => {
        console.error('Failed to load seasons:', error);
      }
    );
  }

  addMarkupControls() {
    this.seasons.forEach((season: any) => {
      this.markupForm.addControl(`season_${season.seasonId}`, this.fb.group({
        markupPercentage: ['', Validators.required] // Add markup control for each season
      }));
    });
  }

  onSubmit() {
    if (this.markupForm.valid) {
      const markups = Object.entries(this.markupForm.controls).map(([key, value]) => {
        return {
          seasonId: key.split('_')[1],
          markupPercentage: value.value.markupPercentage
        };
      });

      const dataToSend = {
        contractId: this.contractId,
        seasonMarkups: markups
      };

      // Now you can send the markups data to the backend
      this.markupServicesService.addMarkup(dataToSend).subscribe(
        (response) => {
          console.log('Markups sent successfully:', response);
          // Handle success response
        },
        (error) => {
          console.error('Failed to send markups:', error);
          // Handle error response
        }
      );
    }
  }
}
