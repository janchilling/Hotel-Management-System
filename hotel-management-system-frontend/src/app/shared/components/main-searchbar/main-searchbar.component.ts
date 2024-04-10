import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { SearchParamsService } from "../../services/searchParams/search-params.service";

@Component({
  selector: 'app-main-searchbar',
  templateUrl: './main-searchbar.component.html',
  styleUrls: ['./main-searchbar.component.scss']
})
export class MainSearchbarComponent implements OnInit {
  searchForm!: FormGroup;
  minCheckInDate: string = '';
  minCheckOutDate: string = '';
  showCheckIn: boolean = false;
  showCheckOut: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private searchParamsService: SearchParamsService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      destination: ['', Validators.required],
      noOfRooms: ['', Validators.required],
      nofPersons: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required]
    });
    this.setCheckinMinDate();
    this.searchParamsService.searchParams$.subscribe(params => {
      this.searchForm.patchValue(params);
    });
  }

  setCheckinMinDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minCheckInDate = tomorrow.toISOString().split('T')[0];
  }

  updateMinCheckoutDate() {
    const checkInDate = new Date(this.searchForm.value.checkIn);
    const minCheckout = new Date(checkInDate.getTime() + (24 * 60 * 60 * 1000)); // +1 day
    this.minCheckOutDate = minCheckout.toISOString().split('T')[0];
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const destination = this.searchForm.value.destination;
      const noOfRooms = this.searchForm.value.noOfRooms;
      const nofPersons = this.searchForm.value.nofPersons;
      const checkIn = this.searchForm.value.checkIn;
      const checkOut = this.searchForm.value.checkOut;

      this.router.navigate(['/main/results'], { queryParams: { destination, noOfRooms, nofPersons, checkIn, checkOut } });
    }
  }

  toggleCheckIn() {
    this.showCheckIn = !this.showCheckIn;
  }

  // Method to toggle the visibility of Check Out date input
  toggleCheckOut() {
    this.showCheckOut = !this.showCheckOut;
  }

}

// Add validation if checkout selected first
