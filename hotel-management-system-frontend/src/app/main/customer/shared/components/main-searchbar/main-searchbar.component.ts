import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SearchParamsService} from "../../../../../shared/services/searchParams/search-params.service";

@Component({
  selector: 'app-main-searchbar',
  templateUrl: './main-searchbar.component.html',
  styleUrls: ['./main-searchbar.component.scss']
})
export class MainSearchbarComponent implements OnInit {

  searchForm!: FormGroup;
  minCheckInDate: string = '';
  minCheckOutDate: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private searchParamsService: SearchParamsService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      destination: ['', Validators.required],
      noOfRooms: ['', Validators.required],
      noOfPersons: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required]
    });
    this.setCheckinMinDate();
    this.searchParamsService.searchParams$.subscribe(params => {
      this.searchForm.patchValue(params);
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const { destination, noOfRooms, noOfPersons, checkIn, checkOut } = this.searchForm.value;
      this.router.navigate(['/main/results'], { queryParams: { destination, noOfRooms, noOfPersons, checkIn, checkOut } });
    } else {
      this.snackBar.open('Please correct the errors in the form', 'Dismiss', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }

  setCheckinMinDate(): void {
    const today = new Date();
    const minCheckIn = new Date(today.getTime() + (24 * 60 * 60 * 1000)); // Tomorrow
    this.minCheckInDate = minCheckIn.toISOString().split('T')[0];

    const minCheckOut = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000)); // Today + 2 days
    this.minCheckOutDate = minCheckOut.toISOString().split('T')[0];
  }

  updateMinCheckoutDate(): void {
    const checkInDate = new Date(this.searchForm.value.checkIn);
    let checkOutDate = new Date(this.searchForm.value.checkOut);

    if (checkOutDate < checkInDate) {
      checkOutDate = new Date(checkInDate.getTime() + (24 * 60 * 60 * 1000));
      this.searchForm.patchValue({ checkOut: checkOutDate.toISOString().split('T')[0] });
    }

    this.minCheckOutDate = checkOutDate.toISOString().split('T')[0];
  }

  validateField(fieldName: string, min: number, max: number, message: string): void {
    const control = this.searchForm.get(fieldName);

    if (control) {
      let value = control.value;
      if (value < min) {
        value = min;
        this.showSnackbarIfNeeded(value, min, max, message);
      } else if (value > max) {
        value = max;
        this.showSnackbarIfNeeded(value, min, max, message);
      }
      this.searchForm.patchValue({ [fieldName]: value });
    }
  }

  showSnackbarIfNeeded(value: number, min: number, max: number, message: string): void {
    if (value <= min || value >= max) {
      this.snackBar.open(message, 'Dismiss', {
        duration: 3000,
        panelClass: ['snackbar-error'],
        verticalPosition: 'top'
      });
    }
  }

  validateRooms(): void {
    this.validateField('noOfRooms', 1, 10, 'Number of rooms must be between 1 and 10');
  }

  validatePersons(): void {
    this.validateField('noOfPersons', 1, 30, 'Number of Persons must be between 1 and 30');
  }
}
