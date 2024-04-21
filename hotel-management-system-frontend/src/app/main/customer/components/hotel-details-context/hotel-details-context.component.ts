import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HotelDetailsByIdService } from '../../../../shared/services/hotelDetailsById/hotel-details-by-id.service';
import {HotelDetails} from "../../../../shared/interfaces/hotel-details";
import {catchError, throwError, timeout} from "rxjs";

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
  showPopupCarousel = false;

  constructor(
    private hotelDetailsByIdService: HotelDetailsByIdService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelId = +this.route.snapshot.params['hotelId'];
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'];
      this.checkOutDate = params['checkOut'];
    });

    this.fetchHotelDetails();
  }

  fetchHotelDetails() {
    this.hotelDetailsByIdService.getHotelDetailsById(this.hotelId).pipe(
      timeout(30000),
      catchError(error => {
        this.error = true;
        this.loading = false;
        return throwError(() => error);
      })
    ).subscribe({
      next: (response: any) => {
        if (response.statusCode === 200) {
          this.hotelDetails = response.data as HotelDetails;
          console.log(this.hotelDetails);
          this.loading = false;
        } else {
          this.error = true;
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error fetching hotel details:', error);
        this.error = true;
        this.loading = false;
      }
    }
    );
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

  viewbookingContext() {
    this.router.navigate(['/main/booking'], { queryParams: { hotelId: this.hotelId, checkIn: this.checkInDate, checkOut: this.checkOutDate } });

  }
}
