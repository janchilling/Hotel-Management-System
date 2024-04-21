import {Component} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {HotelServicesService} from "../../../shared/services/hotelServices/hotel-services.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import { ConfirmationDialogComponentComponent } from "../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-hotel-context',
  templateUrl: './add-hotel-context.component.html',
  styleUrls: ['./add-hotel-context.component.scss']
})
export class AddHotelContextComponent {

  hotelForm: FormGroup;
  images: File[] = [];
  uploadProgress: { [key: string]: number } = {};
  downloadUrls: string[] = [];
  hotelStarRating: number = 1;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private hotelService: HotelServicesService) {
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      hotelEmail: ['', [Validators.required, Validators.email]],
      hotelStreetAddress: ['', Validators.required],
      hotelCity: ['', Validators.required],
      hotelState: ['', Validators.required],
      hotelCountry: ['', Validators.required],
      hotelPostalCode: ['', Validators.required],
      hotelDescription: ['', [Validators.required, Validators.minLength(750), Validators.maxLength(1000)]],
      hotelBriefDescription: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(250)]],
      hotelStarRating: [this.hotelStarRating, [Validators.required, Validators.min(1), Validators.max(5)]],
      hotelPhones: this.fb.array([this.createPhone()])
    });
  }

  submitForm(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Confirm submit Hotel details?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendData();
      }
    });
  }

  sendData() {
    this.isLoading = true;
    this.uploadImages();
    console.log('Form submitted successfully');
  }

  uploadImages() {
    this.images.forEach((image, index) => {
      const filePath = `hotel_images/${new Date().getTime()}_${index}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, image);

      // Track upload progress
      uploadTask.percentageChanges().subscribe((percentage) => {
        this.uploadProgress[filePath] = percentage || 0;
      });

      // Get download URL after upload is complete
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.downloadUrls.push(url);

            // Create DTO and send data to backend after all images are uploaded
            if (this.downloadUrls.length === this.images.length) {
              const hotelRequest = {
                hotelName: this.hotelForm.value.hotelName,
                hotelEmail: this.hotelForm.value.hotelEmail,
                hotelStreetAddress: this.hotelForm.value.hotelStreetAddress,
                hotelCity: this.hotelForm.value.hotelCity,
                hotelState: this.hotelForm.value.hotelState,
                hotelCountry: this.hotelForm.value.hotelCountry,
                hotelPostalCode: this.hotelForm.value.hotelPostalCode,
                hotelDescription: this.hotelForm.value.hotelDescription,
                hotelBriefDescription: this.hotelForm.value.hotelBriefDescription,
                hotelRating: this.hotelForm.value.hotelStarRating,
                hotelPhones: this.hotelForm.value.hotelPhones.map((phone: {
                  phoneNumber: any;
                }) => ({hotelPhone: phone.phoneNumber})),
                hotelImages: this.downloadUrls.map(imageUrl => ({hotelImageURL: imageUrl})),
              };

              this.hotelService.addHotel(hotelRequest).subscribe({
                next: (response) => {
                  if (response.statusCode == 201) {
                    this.isLoading = false;
                    this.snackBar.open('Hotel Added successfully.', 'Close', {
                      duration: 3000, // Duration in milliseconds
                      verticalPosition: 'top'
                    });
                    this.router.navigate(['/administration/dashboard']);
                  }else if(response.statusCode == 409){
                    this.isLoading = false;
                    this.snackBar.open('This hotel already exists.', 'Close', {
                      duration: 3000, // Duration in milliseconds
                      verticalPosition: 'top'
                    });
                  }else{
                    this.isLoading = false;
                    this.isError = true;
                  }
                },
                error: (error) => {
                  console.error('Error adding hotel:', error);
                }
              })
              // Now you can send the hotelRequest DTO to your backend API
              console.log('Hotel Request DTO:', hotelRequest);
            }
          });
        })
      ).subscribe();
    });
  }

  handleImageUpload(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.images.push(file);
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  get f() {
    return this.hotelForm.controls;
  }

  // Getter for accessing the hotelPhones FormArray
  get phoneControls() {
    return this.hotelForm.get('hotelPhones') as FormArray;
  }

  // Function to create a new phone input FormGroup
  createPhone(): FormGroup {
    return this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  // Function to add a new phone input field
  addPhone() {
    this.phoneControls.push(this.createPhone());
  }

  // Function to remove a phone input field
  removePhone(index: number) {
    this.phoneControls.removeAt(index);
  }

  protected readonly Math = Math;
}
