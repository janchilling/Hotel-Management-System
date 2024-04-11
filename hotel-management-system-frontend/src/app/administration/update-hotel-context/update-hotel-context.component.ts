import { Component } from '@angular/core';
import {HotelDetailsByIdService} from "../../shared/services/hotelDetailsById/hotel-details-by-id.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, throwError, timeout} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ConfirmationDialogComponentComponent
} from "../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {finalize} from "rxjs/operators";
import {HotelServicesService} from "../../shared/services/hotelServices/hotel-services.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-hotel-context',
  templateUrl: './update-hotel-context.component.html',
  styleUrls: ['./update-hotel-context.component.scss']
})
export class UpdateHotelContextComponent {
  hotelDetails: any;
  hotelId: any;
  isLoading: boolean = false;
  isError: boolean = false;
  updateForm: FormGroup; // Declare FormGroup

  constructor(
    private hotelDetailsByIdService: HotelDetailsByIdService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private hotelService: HotelServicesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this.updateForm = this.formBuilder.group({
      hotelName: ['', Validators.required],
      hotelEmail: ['', [Validators.required, Validators.email]],
      hotelStreetAddress: ['', Validators.required],
      hotelCity: ['', Validators.required],
      hotelState: ['', Validators.required],
      hotelCountry: ['', Validators.required],
      hotelPostalCode: ['', Validators.required],
      hotelDescription: ['', [Validators.required, Validators.minLength(750), Validators.maxLength(1000)]],
      hotelBriefDescription: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(250)]]
    });
  }

  ngOnInit(): void {
    this.hotelId = +this.route.snapshot.params['hotelId'];
    this.fetchHotelDetailsAdmin();
  }

  fetchHotelDetailsAdmin() {
    this.isLoading = true;
    this.hotelDetailsByIdService.getHotelDetailsByIdAdmin(this.hotelId).pipe(
      timeout(30000),
      catchError(error => {
        this.isError = true;
        this.isLoading = false;
        return throwError(() => error);
      })
    ).subscribe({
      next: (response: any) => {
        if (response.statusCode === 200) {
          this.hotelDetails = response.data;
          this.updateForm.patchValue(this.hotelDetails);
          this.isLoading = false;
        } else {
          console.error('Error fetching hotel details:', response.message);
          this.isError = true;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching hotel details:', error);
        this.isError = true;
        this.isLoading = false;
      }
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
    this.hotelService.updateHotel(this.hotelId, this.updateForm.value).subscribe({
      next: (response) => {
        if (response.statusCode == 200) {
          this.isLoading = false;
          this.snackBar.open('Hotel updated successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
          this.router.navigate(['/administration/hotel/', this.hotelId]);
        }else{
          this.isLoading = false;
          this.isError = true;
        }
      },
      error: (error) => {
        console.error('Error adding hotel:', error);
      }
    })
  }

}
