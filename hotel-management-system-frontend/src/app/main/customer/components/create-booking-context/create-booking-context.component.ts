import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, throwError, timeout} from "rxjs";
import {HotelDetails} from "../../../../shared/interfaces/hotel-details";
import {MainHotelServiceService} from "../../shared/services/mainHotelService/main-hotel-service.service";
import {MainBookingServicesService} from "../../shared/services/mainBookingService/main-booking-services.service";
import {
  ConfirmationDialogComponentComponent
} from "../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-booking-context',
  templateUrl: './create-booking-context.component.html',
  styleUrls: ['./create-booking-context.component.scss']
})
export class CreateBookingContextComponent implements OnInit {

  hotelId: any;
  hotelDetails: any;
  isBookingDetailsVisible: boolean = true;
  isPaymentVisible: boolean = false;
  isConfirmationVisible: boolean = false;
  contractId: any;
  contactDetails: any;
  bookingRooms: any;
  bookingSupplements: any;
  discount: any;
  confirmedBooking: any;
  noOfPersons: any;
  loading: boolean = true;
  error: boolean = false;
  userId: any;
  checkInDate: any;
  checkOutDate: any;

  constructor(
    private hotelService: MainHotelServiceService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private bookingService: MainBookingServicesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {;
      this.hotelId = params['hotelId'];
    });
    this.userId = localStorage.getItem("userId");
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'];
      this.checkOutDate = params['checkOut'];
    });
    this.checkUserHasBooking(this.userId, this.checkInDate, this.checkOutDate);
  }

  checkUserHasBooking(userId: number, checkInDate: String, checkOutDate: String) {
    this.bookingService.checkUserHasBooking(userId, checkInDate, checkOutDate).pipe(
      timeout(30000),
      catchError(error => {
        this.error = true;
        this.loading = false;
        return throwError(() => error);
      })
    ).subscribe({
        next: (response: any) => {
          console.log(response)
          if (response.statusCode === 200) {
            this.loading = false;
            this.fetchHotelDetails();
          }else if (response.statusCode === 409){
            this.loading = false;
            this.snackBar.open('Cannot Book, You already have a booking, Please change dates.', 'Close', {
              duration: 5000, // Duration in milliseconds
              verticalPosition: 'top', // Position of the snackbar
            })
            this.router.navigate(['/main/hotel', this.hotelId], { queryParams: { checkIn: this.checkInDate, checkOut: this.checkOutDate } });
          }else {
            console.error('Internal Server Error :', response.message);
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

  fetchHotelDetails() {
    this.hotelService.getHotelDetailsById(this.hotelId).pipe(
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
            this.contractId = this.hotelDetails.contractId;
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

  showBookingDetails() {
    this.isBookingDetailsVisible = true;
    this.isPaymentVisible = false;
  }

  handlePurchaseClicked(data: any) {

    this.contactDetails = data.contactDetails;
    this.bookingRooms = data.bookingRooms;
    this.bookingSupplements = data.bookingSupplements;
    this.discount = data.discount;
    this.noOfPersons = data.noOfPersons;
    this.isBookingDetailsVisible = false;
    this.isPaymentVisible = true;
  }

  handleBookingPlaced(data: any) {

    this.confirmedBooking = data;
    this.isBookingDetailsVisible = false;
    this.isPaymentVisible = false;
    this.isConfirmationVisible = true;
  }

  showPayment() {
    this.isBookingDetailsVisible = false;
    this.isPaymentVisible = true;
  }
}
