import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DiscountServicesService} from "../../../../../shared/services/discountServices/discount-services.service";
import {SeasonServicesService} from "../../../../../shared/services/seasonServices/season-services.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LocationStrategy} from "@angular/common";
import {
  ConfirmationDialogComponentComponent
} from "../../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {finalize} from "rxjs/operators";
import {SupplementServicesService} from "../../../../../shared/services/supplementServices/supplement-services.service";
import {
  AdminSupplementServicesService
} from "../../../../shared/services/AdminSupplementServices/admin-supplement-services.service";

@Component({
  selector: 'app-supplements-update',
  templateUrl: './supplements-update.component.html',
  styleUrls: ['./supplements-update.component.scss']
})
export class SupplementsUpdateComponent {

  supplementForm: FormGroup;
  contractId: any;
  seasons: any[] = [];
  images: any[] = [];
  seasonCount: any;
  isLoading: boolean = false;
  isError: boolean = false;
  returnUrl: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private supplementsService: SupplementServicesService,
    private adminSupplementServices: AdminSupplementServicesService,
    private seasonServicesService: SeasonServicesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private locationStrategy: LocationStrategy
  ) {
    this.supplementForm = this.fb.group({
      supplements: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.params['contractId'];
    this.returnUrl = this.router.url;
    console.log(this.returnUrl)
    this.loadDSupplementsDetails();
    this.loadSeasons();
  }

  loadDSupplementsDetails() {
    this.supplementsService.getSupplementsByContractId(this.contractId).subscribe({
      next: (response) => {
        const supplements = response.data;
        this.isLoading = false;
        this.populateSupplementsForm(supplements);
      },
      error: (error) => {
        console.error('Failed to load Supplements details:', error);
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
        this.addSupplementControls();
      },
      error: (error) => {
        console.error('Failed to load seasons:', error);
      }
    });
  }

  populateSupplementsForm(supplements: any[]) {
    const supplementsArray = this.supplementForm.get('supplements') as FormArray;
    supplementsArray.clear();
    supplements.forEach(supplement => {
      const supplementsGroup = this.createSupplementFormGroup();
      supplementsGroup.patchValue(supplement);
      const seasonSupplements = supplementsGroup.get('seasonSupplements') as FormArray;
      seasonSupplements.clear()
      supplement.seasonSupplements.forEach((seasonSupplement: any, index: number) => {
        const seasonSupplementGroup = this.createSeasonSupplementFormGroup(seasonSupplement.seasonId);
        seasonSupplementGroup.patchValue(seasonSupplement);
        seasonSupplements.push(seasonSupplementGroup);
      });
      supplementsArray.push(supplementsGroup);
    });
  }

  addSupplement() {
    this.addSupplementControls();
  }

  get supplementsArray() {
    return this.supplementForm.get('supplements') as FormArray;
  }

  getSeasonSupplements(supplementIndex: number): FormArray {
    return this.getSupplementFormGroup(supplementIndex).get('seasonSupplements') as FormArray;
  }

  addSupplementControls() {
    const supplementsArray = this.supplementForm.get('supplements') as FormArray;
    supplementsArray.push(this.createSupplementFormGroup());
  }

  removeSupplement(index: number) {
    const supplementsArray = this.supplementForm.get('supplements') as FormArray;
    supplementsArray.removeAt(index);
  }

  createSupplementFormGroup(): FormGroup {
    const supplementsGroup = this.fb.group({
      supplementId: [''],
      supplementName: ['', Validators.required],
      supplementDescription: ['', Validators.required],
      imageIconURL: [''],
      contractId: [this.contractId],
      seasonSupplements: this.fb.array([])
    });
    for (let i = 0; i < this.seasonCount; i++) {
      const seasonId = this.seasons[i].seasonId;
      const seasonSupplementGroup = this.createSeasonSupplementFormGroup(seasonId);
      (supplementsGroup.get('seasonSupplements') as FormArray).push(seasonSupplementGroup);
    }
    return supplementsGroup;
  }

  createSeasonSupplementFormGroup(seasonId: number): FormGroup {
    return this.fb.group({
      seasonId: [seasonId],
      seasonName: [''],
      supplementPrice: ['', Validators.required]
    });
  }

  getSupplementFormGroup(index: number): FormGroup {
    return (this.supplementForm.get('supplements') as FormArray).at(index) as FormGroup;
  }

  getSeasonSupplementFormGroup(supplementIndex: number, seasonIndex: number): FormGroup {
    return this.getSeasonSupplements(supplementIndex).at(seasonIndex) as FormGroup;
  }

  onFileSelected(event: any, discountIndex: number) {
    const file = event.target.files[0];

    // Store the selected file in the images array at the specified supplement index
    if (!this.images) {
      this.images = [];
    }
    if (!this.images[discountIndex]) {
      this.images[discountIndex] = [];
    }
    this.images[discountIndex][0] = file;
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

  // sendImages() {
  //   // Iterate through each discount form group
  //   this.supplementForm.value.supplements.forEach((discount: any, discountIndex: number) => {
  //     // Check if there are images for the current discount
  //     if (this.images && this.images[discountIndex]) {
  //       this.images[discountIndex].forEach((file: File, imageIndex: number) => {
  //         if (file) {
  //           const filePath = `discount-images/${new Date().getTime()}_${file.name}`;
  //           const fileRef = this.storage.ref(filePath);
  //           const uploadTask = this.storage.upload(filePath, file);
  //           uploadTask.snapshotChanges().pipe(
  //             finalize(() => {
  //               fileRef.getDownloadURL().subscribe(downloadURL => {
  //                 // Update the discount's image URL with the Firebase download URL
  //                 if (!discount.discountImageURL) {
  //                   discount.discountImageURL = [];
  //                 }
  //                 discount.discountImageURL[imageIndex] = downloadURL;
  //
  //                 // Update the form value with the new image URLs
  //                 this.supplementForm.patchValue({
  //                   supplements: this.supplementForm.value.supplements
  //                 });
  //               });
  //             })
  //           ).subscribe();
  //         }
  //       });
  //     }
  //   });
  // }


  handleDeleteSupplement(supplementId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to Delete? Cannot be undone!'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSupplement(supplementId);
      }
    });
  }

  deleteSupplement(supplementId: number) {
    this.adminSupplementServices.deleteSupplementById(supplementId).subscribe({
      next: (response) => {
        if(response.statusCode == 200){
          this.snackBar.open('Discount deleted successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
          this.reloadCurrentUrl();
        }else{
          console.log(response)
        }
      },
      error: (error) => {
        console.error('Failed to delete discount:', error);
      }
    });

  }

  reloadCurrentUrl() {
    const currentUrl = this.locationStrategy.path(true);
    window.location.assign(currentUrl);
  }

  submitData() {
    // this.sendImages();
    this.isLoading = true;
    if (this.supplementForm.valid) {
      const dataToSend = this.supplementForm.get("supplements")?.value;
      console.log(dataToSend)

      this.adminSupplementServices.updateSupplements(dataToSend).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.statusCode == 200) {
            this.snackBar.open('Supplement details Updated successfully', 'Close', {
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
          console.error('Failed to send discount details:', error);
        }
      });
    }
  }

}
