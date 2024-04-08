import {Component, OnInit} from '@angular/core';
import {HotelDetailsByIdService} from "../../shared/services/hotelDetailsById/hotel-details-by-id.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, throwError, timeout} from "rxjs";

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
    private hotelDetailsByIdService: HotelDetailsByIdService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log("Hello")
    this.hotelId = +this.route.snapshot.params['hotelId'];
    console.log(this.hotelId)
    this.fetchHotelDetailsAdmin()
  }

  fetchHotelDetailsAdmin() {
    console.log("Hello")
    this.hotelDetailsByIdService.getHotelDetailsByIdAdmin(this.hotelId).pipe(
      timeout(30000),
      catchError(error => {
        this.error = true;
        this.loading = false;
        return throwError(() => error);
      })
    ).subscribe({
        next: (response: any) => {
          if (response.statusCode === 200) {
            this.hotelDetails = response.data
            console.log(this.hotelDetails);
            this.loading = false;
          } else {
            console.error('Error fetching hotel details:', response.message);
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

}
