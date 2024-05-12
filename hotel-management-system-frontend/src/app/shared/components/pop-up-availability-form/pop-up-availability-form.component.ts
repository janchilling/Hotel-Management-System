import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HotelServicesService} from "../../services/hotelServices/hotel-services.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-pop-up-availability-form',
  templateUrl: './pop-up-availability-form.component.html',
  styleUrls: ['./pop-up-availability-form.component.scss']
})
export class PopUpAvailabilityFormComponent implements OnInit {

  availabilityForm: FormGroup;
  minCheckInDate: string = '';
  minCheckOutDate: string = '';
  isLoading: boolean = false;
  hotelId: any;

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private hotelServicesService: HotelServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<PopUpAvailabilityFormComponent>
  ) {
    this.availabilityForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      noOfRooms: ['', [Validators.required, Validators.min(1)]],
      noOfPersons: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.setCheckinMinDate();
    this.route.queryParams.subscribe(params => {
      this.hotelId = params['hotelId'];
    });
  }

  setCheckinMinDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minCheckInDate = tomorrow.toISOString().split('T')[0];
  }

  updateMinCheckoutDate() {
    const checkInDate = new Date(this.availabilityForm.value.checkIn);
    const minCheckout = new Date(checkInDate.getTime() + (24 * 60 * 60 * 1000)); // +1 day
    this.minCheckOutDate = minCheckout.toISOString().split('T')[0];
  }

  checkAvailability() {
    if (this.availabilityForm.valid) {
      this.isLoading = true;
      const checkIn = this.availabilityForm.value.checkIn;
      const checkOut = this.availabilityForm.value.checkOut;
      const noOfRooms = this.availabilityForm.value.noOfRooms;
      const noOfPersons = this.availabilityForm.value.noOfPersons;
      console.log(this.hotelId, noOfRooms, noOfPersons, checkIn, checkOut)
      this.hotelServicesService.checkAvailabilityByHotel(this.hotelId, noOfRooms, noOfPersons, checkIn, checkOut).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if(response.statusCode === 200 && response.data == true) {
            this.matSnackBar.open('Rooms available for selected dates', 'Close', {
              duration: 3000,
              panelClass: 'success-snackbar',
              verticalPosition: 'top'
            })
            const queryParams: NavigationExtras = {
              queryParams: { hotelId: this.hotelId, checkIn: checkIn, checkOut: checkOut }
            };
            this.router.navigate([], queryParams);
            this.dialogRef.close();
          } else {
            this.matSnackBar.open('Rooms unavailable for selected dates', 'Close', {
              duration: 3000,
              panelClass: 'error-snackbar',
              verticalPosition: 'top'
            })
          }
          },
        error: (err) => {
          this.isLoading = false;
          console.log(err)
        }
      })

    } else {
      this.matSnackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar',
        verticalPosition: 'top'
      })
    }
  }

}
