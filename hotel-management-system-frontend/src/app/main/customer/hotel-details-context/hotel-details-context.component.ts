import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelDetailsByIdService } from '../../../shared/services/hotelDetailsById/hotel-details-by-id.service';

@Component({
  selector: 'app-hotel-details-context',
  templateUrl: './hotel-details-context.component.html',
  styleUrls: ['./hotel-details-context.component.scss']
})
export class HotelDetailsContextComponent implements OnInit {
  hotelId: any;
  hotelDetails: any;
  isOverviewVisible: boolean = true;
  isRoomsVisible: boolean = false;

  constructor(
    private hotelDetailsByIdService: HotelDetailsByIdService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Get the hotel ID from the URL path
    this.hotelId = +this.route.snapshot.params['hotelId'];

    this.fetchHotelDetails();
  }

  fetchHotelDetails() {
    this.hotelDetailsByIdService.getHotelDetailsById(this.hotelId).subscribe(
      (response) => {
        this.hotelDetails = response;
        this.hotelDetails = this.hotelDetails.data
        console.log(this.hotelDetails)
      },
      (error) => {
        // Handle error
        console.error('Error fetching hotel details:', error);
      }
    );
  }

  showOverview() {
    this.isOverviewVisible = true;
    this.isRoomsVisible = false;
  }

  showRooms() {
    this.isOverviewVisible = false;
    this.isRoomsVisible = true;
  }
}
