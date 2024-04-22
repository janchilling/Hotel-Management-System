import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DiscountServicesService} from "../../../../../shared/services/discountServices/discount-services.service";
import {SeasonServicesService} from "../../../../../shared/services/seasonServices/season-services.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialogComponentComponent
} from "../../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LocationStrategy} from "@angular/common";
import {
  AdminDiscountServicesService
} from "../../../../shared/services/AdminDiscountServices/admin-discount-services.service";

@Component({
  selector: 'app-discount-update',
  templateUrl: './discount-update.component.html',
  styleUrls: ['./discount-update.component.scss']
})
export class DiscountUpdateComponent implements OnInit{

  discountForm: FormGroup;
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
    private discountService: DiscountServicesService,
    private adminDiscountServices: AdminDiscountServicesService,
    private seasonServicesService: SeasonServicesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private locationStrategy: LocationStrategy
  ) {
    this.discountForm = this.fb.group({
      discounts: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.params['contractId'];
    this.returnUrl = this.router.url;
    console.log(this.returnUrl)
    this.loadDiscountDetails();
    this.loadSeasons();
  }

  loadDiscountDetails() {
    this.discountService.getDiscounts(this.contractId).subscribe({
      next: (response) => {
        const discounts = response.data;
        this.isLoading = false;
        this.populateDiscountForm(discounts);
      },
      error: (error) => {
        console.error('Failed to load discount details:', error);
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
        this.addDiscountControls();
      },
      error: (error) => {
        console.error('Failed to load seasons:', error);
      }
    });
  }

  populateDiscountForm(discounts: any[]) {
    const discountsArray = this.discountForm.get('discounts') as FormArray;
    discountsArray.clear();
    discounts.forEach(discount => {
      const discountGroup = this.createDiscountFormGroup();
      discountGroup.patchValue(discount);
      const seasonDiscounts = discountGroup.get('seasonDiscounts') as FormArray;
      seasonDiscounts.clear()
      discount.seasonDiscounts.forEach((seasonDiscount: any, index: number) => {
        const seasonDiscountGroup = this.createSeasonDiscountFormGroup(seasonDiscount.seasonId);
        seasonDiscountGroup.patchValue(seasonDiscount);
        seasonDiscounts.push(seasonDiscountGroup);
      });
      discountsArray.push(discountGroup);
    });
  }

  addDiscount() {
    this.addDiscountControls();
  }

  get discountsArray() {
    return this.discountForm.get('discounts') as FormArray;
  }

  getSeasonDiscounts(discountIndex: number): FormArray {
    return this.getDiscountFormGroup(discountIndex).get('seasonDiscounts') as FormArray;
  }

  addDiscountControls() {
    const discountsArray = this.discountForm.get('discounts') as FormArray;
    discountsArray.push(this.createDiscountFormGroup());
  }

  removeDiscount(index: number) {
    const discountsArray = this.discountForm.get('discounts') as FormArray;
    discountsArray.removeAt(index);
  }

  createDiscountFormGroup(): FormGroup {
    const discountGroup = this.fb.group({
      discountId: [''],
      discountName: ['', Validators.required],
      discountCode: ['', Validators.required],
      discountImageURL: [''],
      contractId: [this.contractId],
      discountDescription: ['', Validators.required],
      seasonDiscounts: this.fb.array([])
    });
    for (let i = 0; i < this.seasonCount; i++) {
      const seasonId = this.seasons[i].seasonId;
      const seasonDiscountGroup = this.createSeasonDiscountFormGroup(seasonId);
      (discountGroup.get('seasonDiscounts') as FormArray).push(seasonDiscountGroup);
    }
    return discountGroup;
  }

  createSeasonDiscountFormGroup(seasonId: number): FormGroup {
    return this.fb.group({
      seasonId: [seasonId],
      seasonName: [''],
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  getDiscountFormGroup(index: number): FormGroup {
    return (this.discountForm.get('discounts') as FormArray).at(index) as FormGroup;
  }

  getSeasonDiscountFormGroup(discountIndex: number, seasonIndex: number): FormGroup {
    return this.getSeasonDiscounts(discountIndex).at(seasonIndex) as FormGroup;
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

  sendImages() {
    // Iterate through each discount form group
    this.discountForm.value.discounts.forEach((discount: any, discountIndex: number) => {
      // Check if there are images for the current discount
      if (this.images && this.images[discountIndex]) {
        this.images[discountIndex].forEach((file: File, imageIndex: number) => {
          if (file) {
            const filePath = `discount-images/${new Date().getTime()}_${file.name}`;
            const fileRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, file);
            uploadTask.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(downloadURL => {
                  // Update the discount's image URL with the Firebase download URL
                  if (!discount.discountImageURL) {
                    discount.discountImageURL = [];
                  }
                  discount.discountImageURL[imageIndex] = downloadURL;

                  // Update the form value with the new image URLs
                  this.discountForm.patchValue({
                    discounts: this.discountForm.value.discounts
                  });
                });
              })
            ).subscribe();
          }
        });
      }
    });
  }


  handleDeleteDiscount(discountId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to Delete? Cannot be undone!'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDiscount(discountId);
      }
    });
  }

  deleteDiscount(discountId: number) {
    this.adminDiscountServices.deleteDiscountById(discountId).subscribe({
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
    this.sendImages();
    this.isLoading = true;
    if (this.discountForm.valid) {
      const dataToSend = this.discountForm.get("discounts")?.value;
      console.log(dataToSend)

      this.adminDiscountServices.updateDiscounts(dataToSend).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.statusCode == 200) {
            this.snackBar.open('Discount details Updated successfully', 'Close', {
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
