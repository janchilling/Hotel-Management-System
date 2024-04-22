import { Component } from '@angular/core';
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
import {
  AdminRoomTypeServicesService
} from "../../../../shared/services/AdminRoomTypeServices/admin-room-type-services.service";
import {RoomTypeServicesService} from "../../../../../shared/services/roomTypesServices/room-type-services.service";

@Component({
  selector: 'app-room-type-update',
  templateUrl: './room-type-update.component.html',
  styleUrls: ['./room-type-update.component.scss']
})
export class RoomTypeUpdateComponent {

  roomTypeForm: FormGroup;
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
    private roomTypeServices: RoomTypeServicesService,
    private adminRoomTypeService: AdminRoomTypeServicesService,
    private seasonServicesService: SeasonServicesService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private locationStrategy: LocationStrategy
  ) {
    this.roomTypeForm = this.fb.group({
      roomTypes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.contractId = +this.route.snapshot.params['contractId'];
    this.returnUrl = this.router.url;
    console.log(this.returnUrl)
    this.loadRoomTypesDetails();
    this.loadSeasons();
  }

  loadRoomTypesDetails() {
    this.roomTypeServices.getRoomsByContractId(this.contractId).subscribe({
      next: (response) => {
        console.log(response)
        const roomTypes = response.data;
        this.isLoading = false;
        this.populateRoomTypesForm(roomTypes);
      },
      error: (error) => {
        console.error('Failed to load RoomTypes details:', error);
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
        this.addRoomTypeControls();
      },
      error: (error) => {
        console.error('Failed to load seasons:', error);
      }
    });
  }

  populateRoomTypesForm(roomTypes: any[]) {
    const roomTypesArray = this.roomTypeForm.get('roomTypes') as FormArray;
    roomTypesArray.clear();
    roomTypes.forEach(roomType => {
      console.log(roomType)
      const roomTypesGroup = this.createRoomTypeFormGroup();
      roomTypesGroup.patchValue(roomType);
      const seasonRoomtype = roomTypesGroup.get('seasonRoomtype') as FormArray;
      seasonRoomtype.clear()
      roomType.seasonRoomtype.forEach((seasonRoomTypeItem: any, index: number) => {
        console.log("Hello")
        console.log(seasonRoomTypeItem)
        const seasonRoomTypeGroup = this.createSeasonRoomTypeFormGroup(seasonRoomTypeItem.seasonId);
        seasonRoomTypeGroup.patchValue(seasonRoomTypeItem);
        seasonRoomtype.push(seasonRoomTypeGroup);
      });
      roomTypesArray.push(roomTypesGroup);
    });
  }

  addRoomType() {
    this.addRoomTypeControls();
  }

  get roomTypesArray() {
    return this.roomTypeForm.get('roomTypes') as FormArray;
  }

  getSeasonRoomTypes(roomTypeIndex: number): FormArray {
    return this.getRoomTypeFormGroup(roomTypeIndex).get('seasonRoomtype') as FormArray;
  }

  addRoomTypeControls() {
    const roomTypesArray = this.roomTypeForm.get('roomTypes') as FormArray;
    console.log(roomTypesArray)
    roomTypesArray.push(this.createRoomTypeFormGroup());
  }

  removeRoomType(index: number) {
    const roomTypesArray = this.roomTypeForm.get('roomTypes') as FormArray;
    roomTypesArray.removeAt(index);
  }

  createRoomTypeFormGroup(): FormGroup {
    const roomTypesGroup = this.fb.group({
      roomTypeId: [''],
      roomTypeName: ['', Validators.required],
      roomDimensions: ['', Validators.required],
      maxAdults: [''],
      contractId: [this.contractId],
      seasonRoomtype: this.fb.array([])
    });

    // Check if seasons data is available
    if (this.seasons && this.seasons.length > 0) {
      for (let i = 0; i < this.seasonCount; i++) {
        const seasonId = this.seasons[i].seasonId;
        const seasonRoomTypeGroup = this.createSeasonRoomTypeFormGroup(seasonId);
        (roomTypesGroup.get('seasonRoomtype') as FormArray).push(seasonRoomTypeGroup);
      }
    }

    return roomTypesGroup;
  }


  createSeasonRoomTypeFormGroup(seasonId: number): FormGroup {
    return this.fb.group({
      seasonId: [seasonId],
      seasonName: [''],
      roomTypePrice: ['', Validators.required],
      noOfRooms: ['', Validators.required]
    });
  }

  getRoomTypeFormGroup(index: number): FormGroup {
    return (this.roomTypeForm.get('roomTypes') as FormArray).at(index) as FormGroup;
  }

  getSeasonRoomTypeFormGroup(roomTypeIndex: number, seasonIndex: number): FormGroup {
    return this.getSeasonRoomTypes(roomTypeIndex).at(seasonIndex) as FormGroup;
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


  handleDeleteRoomType(roomTypeId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to Delete? Cannot be undone!'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRoomType(roomTypeId);
      }
    });
  }

  deleteRoomType(roomTypeId: number) {
    this.adminRoomTypeService.deleteRoomTypeById(roomTypeId).subscribe({
      next: (response) => {
        if(response.statusCode == 200){
          this.snackBar.open('Room Type deleted successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
          this.reloadCurrentUrl();
        }else{
          console.log(response)
        }
      },
      error: (error) => {
        console.error('Failed to delete Room Type:', error);
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
    if (this.roomTypeForm.valid) {
      const dataToSend = this.roomTypeForm.get("roomTypes")?.value;
      console.log(dataToSend)

      this.adminRoomTypeService.updateRoomTypes(dataToSend).subscribe({
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
