import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { ContractServicesService } from '../../../../shared/services/contractServices/contract-services.service';
import { SeasonServicesService } from '../../../../shared/services/seasonServices/season-services.service';
import {MarkupServicesService} from "../../../../shared/services/markupServices/markup-services.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialogComponentComponent
} from "../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {AddContractDetailsContextComponent} from "../../add-contract-details-context.component";

@Component({
  selector: 'app-markup-details',
  templateUrl: './markup-details.component.html',
  styleUrls: ['./markup-details.component.scss']
})
export class MarkupDetailsComponent implements OnInit {
  markupForm: FormGroup;
  contractId: any;
  seasons: any;
  showMarkup: boolean = true;
  showDiscount: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private seasonServicesService: SeasonServicesService,
    private markupServicesService: MarkupServicesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private addContractDetailsContextComponent: AddContractDetailsContextComponent
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
    this.seasonServicesService.getSeasonsByContractId(this.contractId).subscribe({
      next: (response) => {
        this.seasons = response;
        console.log(this.seasons)
        this.addMarkupControls();
    },
      error: (error) => {
        console.error('Failed to load seasons:', error);
      }
    });
  }

  addMarkupControls() {
    this.seasons.forEach((season: any) => {
      this.markupForm.addControl(`season_${season.seasonId}`, this.fb.group({
        ['markupPercentage_' + season.seasonId]: ['', Validators.required]
      }));
    });
  }

  toggleToDiscount() {
    this.showMarkup = false;
    this.showDiscount = true;
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to submit?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitData();
      }
    });
  }

  submitData(){
    this.isLoading = true;
    if (this.markupForm.valid) {
      const markups = this.seasons.map((season: any) => {
        return {
          seasonId: season.seasonId,
          markupPercentage: this.markupForm.get(`season_${season.seasonId}.markupPercentage_${season.seasonId}`)?.value
        };
      });

      const dataToSend = {
        contractId: this.contractId,
        seasonMarkups: markups
      };

      this.markupServicesService.addMarkup(dataToSend).subscribe({
        next: (response) => {
          this.isLoading = false;
          if(response.statusCode === 201) {
            this.snackBar.open('Markups sent successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            })
            this.addContractDetailsContextComponent.isAddMarkupVisible = false;
            this.addContractDetailsContextComponent.isAddDiscountVisible = true;
          } else if(response.statusCode === 400){
            this.snackBar.open('Bad Request, Try again', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            })
          }else {
            this.isError = true;
          }
        },
        error: (error) => {
          console.error('Failed to send markups:', error);
        }
      });
    }
  }

}
