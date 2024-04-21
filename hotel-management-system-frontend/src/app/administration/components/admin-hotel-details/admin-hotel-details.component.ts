import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-hotel-details',
  templateUrl: './admin-hotel-details.component.html',
  styleUrls: ['./admin-hotel-details.component.scss']
})
export class AdminHotelDetailsComponent implements OnInit {

  hotelDetails: any
  hotelId: any
  loading: boolean = false
  error: boolean = false

  constructor(
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.hotelId = +this.route.snapshot.params['hotelId'];
  }

}
