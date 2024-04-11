import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { SeasonServicesService } from '../../../../shared/services/seasonServices/season-services.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {RoomTypeServicesService} from "../../../../shared/services/roomTypesServices/room-type-services.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddContractDetailsContextComponent} from "../../add-contract-details-context.component";
import {
  ConfirmationDialogComponentComponent
} from "../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {forkJoin, Observable, ObservableInput, of} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';

@Component({
  selector: 'app-roomtypes-details',
  templateUrl: './roomtypes-details.component.html',
  styleUrls: ['./roomtypes-details.component.scss']
})
export class RoomtypesDetailsComponent {

  roomTypeForm: FormGroup;
  contractId: any;
  seasons: any[] = [];
  seasonRoomTypeCount: any;
  images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomTypeService: RoomTypeServicesService,
    private seasonServicesService: SeasonServicesService,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private addContractDetailsContextComponent: AddContractDetailsContextComponent
  ) {
    this.roomTypeForm = this.fb.group({
      roomTypes: this.fb.array([])
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
        this.seasonRoomTypeCount = this.seasons.length;
        this.addRoomTypeControls();
      },
      error: (error) => {
        console.error('Failed to load seasons:', error);
      }
    });
  }

  addRoomTypeControls() {
    const roomTypesArray = this.roomTypeForm.get('roomTypes') as FormArray;
    roomTypesArray.push(this.createRoomTypeFormGroup());
  }

  createRoomTypeFormGroup(): FormGroup {
    const roomTypeGroup = this.fb.group({
      roomTypeName: ['', Validators.required],
      roomDimensions: ['', Validators.required],
      maxAdults: ['', Validators.required],
      contractId: [this.contractId],
      // roomTypeImages: this.fb.array([]),
      seasonRoomTypes: this.fb.array([])
    });
    // Initialize season room types
    for (let i = 0; i < this.seasonRoomTypeCount; i++) {
      const seasonId = this.seasons[i].seasonId; // Get the season ID
      const seasonRoomTypeGroup = this.createSeasonRoomTypeFormGroup(seasonId); // Create the season room type form group with seasonId
      (roomTypeGroup.get('seasonRoomTypes') as FormArray).push(seasonRoomTypeGroup); // Push the form group into the seasonRoomTypes array
    }
    return roomTypeGroup;
  }

  addRoomType() {
    this.roomTypesArray.push(this.createRoomTypeFormGroup());
  }

  createSeasonRoomTypeFormGroup(seasonId: number): FormGroup {
    return this.fb.group({
      seasonId: [seasonId], // Track the season ID here
      roomTypePrice: ['', [Validators.required]],
      noOfRooms: ['', [Validators.required]]
    });
  }

  removeSeasonRoomType(roomTypeIndex: number, seasonIndex: number) {
    const seasonRoomTypes = ((this.roomTypeForm.get('roomTypes') as FormArray).at(roomTypeIndex).get('seasonRoomTypes') as FormArray);
    seasonRoomTypes.removeAt(seasonIndex);
  }

  getRoomTypeFormGroup(index: number): FormGroup {
    return (this.roomTypeForm.get('roomTypes') as FormArray).at(index) as FormGroup;
  }

  get roomTypesArray() {
    return this.roomTypeForm.get('roomTypes') as FormArray;
  }

  getSeasonRoomTypes(roomTypeIndex: number): FormArray {
    return this.getRoomTypeFormGroup(roomTypeIndex).get('seasonRoomTypes') as FormArray;
  }

  getSeasonRoomTypeFormGroup(roomTypeIndex: number, seasonIndex: number): FormGroup {
    return this.getSeasonRoomTypes(roomTypeIndex).at(seasonIndex) as FormGroup;
  }

  validateImage(control: any) {
    const file = control.value;
    if (file) {
      // Check if file type exists and is an image
      if (file.type && file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          // Check image dimensions if needed
          control.setErrors(null);
        };
        img.src = window.URL.createObjectURL(file);
      } else {
        // Handle invalid file types
        control.setErrors({invalidFileType: true});
      }
    }
    return null;
  }

  onFileSelected(event: any, roomTypeIndex: number) {
    const files = event.target.files;

    if (!this.images) {
      this.images = [];
    }

    if (!this.images[roomTypeIndex]) {
      this.images[roomTypeIndex] = [];
    }

    for (let i = 0; i < files.length; i++) {
      this.images[roomTypeIndex].push(files[i]);
    }
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to submit?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createRequest();
      }
    });
  }

  createRequest() {
    if (this.roomTypeForm.valid) {
      const roomTypes = this.roomTypeForm.value.roomTypes;

      const uploadTasks: any = [];

      roomTypes.forEach((roomType: any, roomTypeIndex: number) => {

        let images: any[] = [];

        if (this.images[roomTypeIndex]) {
          this.images[roomTypeIndex].forEach((file: any) => {
            const filePath = `room-type-images/${new Date().getTime()}`;
            const fileRef = this.storage.ref(filePath);
            const uploadTask = this.storage.upload(filePath, file);

            const task$ = uploadTask.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  images.push({ imageURL: url });
                });
              })
            );
            uploadTasks.push(task$);
          });
        }
        roomType.roomTypeImages = images;
      });

      forkJoin(uploadTasks).subscribe(() => {
        this.sendRoomTypeData(roomTypes);
      });
    }
  }

  sendRoomTypeData(roomTypes: any[]) {
    console.log('Room type data to be sent to the backend:', roomTypes);
    this.roomTypeService.addRoomType(roomTypes).subscribe({
      next: (response) => {
        if (response.statusCode == 201) {
          console.log('Room type details sent successfully:', response);
          this.snackBar.open('Room Types sent successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          })
          this.router.navigate(['administration/dashboard'], );
        } else {
          console.error('Failed to send room type details:', response);
        }
        console.log('Room type details sent successfully:', response);
      },
      error: (error) => {
        console.error('Failed to send room type details:', error);
      }
    });
  }
}
