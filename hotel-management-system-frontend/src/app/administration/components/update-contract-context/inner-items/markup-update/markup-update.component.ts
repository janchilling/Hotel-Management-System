import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplementServicesService} from "../../../../../shared/services/supplementServices/supplement-services.service";
import {
  AdminSupplementServicesService
} from "../../../../shared/services/AdminSupplementServices/admin-supplement-services.service";
import {SeasonServicesService} from "../../../../../shared/services/seasonServices/season-services.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LocationStrategy} from "@angular/common";
import {
  ConfirmationDialogComponentComponent
} from "../../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {MarkupServicesService} from "../../../../../shared/services/markupServices/markup-services.service";
import {
  AdminMarkupServicesService
} from "../../../../shared/services/AdminMarkupServices/admin-markup-services.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-markup-update',
  templateUrl: './markup-update.component.html',
  styleUrls: ['./markup-update.component.scss']
})
export class MarkupUpdateComponent {

  markupForm: FormGroup;
  contractId: any;
  seasons: any[] = [];
  seasonCount: any;
  isLoading: boolean = false;
  isError: boolean = false;
  returnUrl: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private markupServices: MarkupServicesService,
    private adminMarkupServices: AdminMarkupServicesService,
    private seasonServicesService: SeasonServicesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.markupForm = this.fb.group({
      markup: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.params['contractId'];
    this.returnUrl = this.router.url;
    this.loadMarkupDetails();
    this.loadSeasons();
  }

  loadMarkupDetails() {
    this.markupServices.getMarkupsByContractId(this.contractId).subscribe({
      next: (response) => {
        console.log(response)
        const markup = response.data;
        this.isLoading = false;
        this.populateMarkupForm(markup);
      },
      error: (error) => {
        console.error('Failed to load markup details:', error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  loadSeasons() {
    this.seasonServicesService.getSeasonsByContractId(this.contractId).subscribe({
      next: (response) => {
        console.log(response);
        this.seasons = response;
        this.seasonCount = this.seasons.length;
        this.addMarkupControls();
      },
      error: (error) => {
        console.error('Failed to load seasons:', error);
      }
    });
  }

  populateMarkupForm(markup: any[]) {
    const markupArray = this.markupForm.get('markup') as FormArray;
    markupArray.clear();
    markup.forEach(markupItem => {
      const markupsGroup = this.createMarkupFormGroup();
      markupsGroup.patchValue(markupItem);
      const seasonMarkups = markupsGroup.get('seasonMarkups') as FormArray;
      seasonMarkups.clear()
      markupItem.seasonMarkups.forEach((seasonMarkup: any, index: number) => {
        const seasonMarkupGroup = this.createSeasonMarkupFormGroup(seasonMarkup.seasonId);
        seasonMarkupGroup.patchValue(seasonMarkup);
        seasonMarkups.push(seasonMarkupGroup);
      });
      markupArray.push(markupsGroup);
    });
  }

  get markupArray() {
    return this.markupForm.get('markup') as FormArray;
  }

  addMarkupControls() {
    const markupArray = this.markupForm.get('markup') as FormArray;
    markupArray.push(this.createMarkupFormGroup());
  }

  createMarkupFormGroup(): FormGroup {
    const markupGroup = this.fb.group({
      markupId: [''],
      contractId: [this.contractId],
      seasonMarkups: this.fb.array([])
    });
    for (let i = 0; i < this.seasonCount; i++) {
      const seasonId = this.seasons[i].seasonId;
      const seasonMarkupGroup = this.createSeasonMarkupFormGroup(seasonId);
      (markupGroup.get('seasonMarkups') as FormArray).push(seasonMarkupGroup);
    }
    return markupGroup;
  }

  createSeasonMarkupFormGroup(seasonId: number): FormGroup {
    return this.fb.group({
      seasonId: [seasonId],
      seasonName: [''],
      markupPercentage: ['', Validators.required]
    });
  }

  getMarkupFormGroup(index: number): FormGroup {
    return (this.markupForm.get('markup') as FormArray).at(index) as FormGroup;
  }

  getSeasonMarkups(index: number): FormArray {
    return this.getMarkupFormGroup(index).get('seasonMarkups') as FormArray;
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

  submitData() {
    this.isLoading = true;
    if (this.markupForm.valid) {
      const markupArray = this.markupForm.get("markup") as FormArray;
      const dataToSend = [markupArray.at(0)?.value];
      console.log(dataToSend[0])

      this.adminMarkupServices.updateMarkup(dataToSend[0]).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.statusCode == 200) {
            this.snackBar.open('Markup details Updated successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            });
            this.router.navigate(["administration/contracts", this.contractId]);
          } else if (response.statusCode == 400) {
            this.snackBar.open('Bad Request, Try again', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            })
          } else if (response.statusCode == 409) {
            this.snackBar.open('Discount code already exists', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            })
          } else {
            console.log(response)
            this.isError = true;
          }
        },
        error: (error) => {
          console.error('Failed to send Markup details:', error);
        }
      });
    }
  }


}
