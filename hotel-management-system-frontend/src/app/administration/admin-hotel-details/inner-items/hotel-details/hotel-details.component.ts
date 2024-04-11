import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, throwError, timeout} from "rxjs";
import {HotelDetailsByIdService} from "../../../../shared/services/hotelDetailsById/hotel-details-by-id.service";

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit{

  @Input() hotelDetails: any
  @Input() hotelId: any
  hotelDetailsForm: FormGroup;
  isLoading: boolean = false
  isError: boolean = false

  constructor(
    private hotelDetailsByIdService: HotelDetailsByIdService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.hotelDetailsForm = this.formBuilder.group({
      hotelName: [''],
      hotelEmail: [''],
      hotelStreetAddress: [''],
      hotelCity: [''],
      hotelState: [''],
      hotelCountry: [''],
      hotelPostalCode: [''],
      hotelDescription: [''],
      hotelBriefDescription: ['']
    });
  }

  ngOnInit(): void {
    this.isLoading = true
    this.fetchHotelDetailsAdmin()
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
          this.hotelDetailsForm.patchValue(this.hotelDetails);
          this.hotelDetailsForm.disable();
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


  handleUpdate(hotelId: any) {
    this.router.navigate(['/administration/updateHotel', hotelId]);
  }

}
