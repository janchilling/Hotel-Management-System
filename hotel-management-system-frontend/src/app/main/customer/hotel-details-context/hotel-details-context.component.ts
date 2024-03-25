import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  checkInDate: any;
  checkOutDate: any;

  constructor(
    private hotelDetailsByIdService: HotelDetailsByIdService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the hotel ID from the URL path
    this.hotelId = +this.route.snapshot.params['hotelId'];
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'];
      this.checkOutDate = params['checkOut'];
    });

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

  viewbookingContext() {
    this.router.navigate(['/main/booking'], { queryParams: { hotelId: this.hotelId, checkIn: this.checkInDate, checkOut: this.checkOutDate } });

  }
}
