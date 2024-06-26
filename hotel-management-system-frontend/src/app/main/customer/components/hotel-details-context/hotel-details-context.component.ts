import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HotelDetails} from "../../../../shared/interfaces/hotel-details";
import {catchError, throwError, timeout} from "rxjs";
import {MainHotelServiceService} from "../../shared/services/mainHotelService/main-hotel-service.service";
import {StandardResponse} from "../../../../shared/interfaces/standard-response";

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
  isOffersVisible: boolean = false;
  checkInDate: any;
  checkOutDate: any;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private hotelService: MainHotelServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hotelId = params['hotelId'];
      this.checkInDate = params['checkIn'];
      this.checkOutDate = params['checkOut'];
    });
    this.fetchHotelDetails();
  }

  fetchHotelDetails() {
    this.hotelService.getHotelDetailsById(this.hotelId).pipe(
      timeout(30000),
      catchError(error => {
        console.error('Error fetching hotel details:', error);
        this.error = true;
        this.loading = false;
        return throwError(() => error);
      })
    ).subscribe((response: StandardResponse<HotelDetails>) => {
      if (response.statusCode === 200) {
        this.hotelDetails = response.data;
      } else {
        this.error = true;
      }
      this.loading = false;
    });
  }

  showOverview() {
    this.isOverviewVisible = true;
    this.isRoomsVisible = false;
    this.isOffersVisible = false;
  }

  showRooms() {
    this.isOverviewVisible = false;
    this.isRoomsVisible = true;
    this.isOffersVisible = false;
  }

  showOffers() {
    this.isOverviewVisible = false;
    this.isRoomsVisible = false;
    this.isOffersVisible = true;
  }

  viewBookingContext() {
    this.router.navigate(['/main/booking'], { queryParams: { hotelId: this.hotelId, checkIn: this.checkInDate, checkOut: this.checkOutDate } });
  }
}
