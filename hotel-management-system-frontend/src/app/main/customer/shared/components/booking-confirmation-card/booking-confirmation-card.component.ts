import {Component, Input, OnInit} from '@angular/core';
import {
  AuthenticationServicesService
} from "../../../../../security/services/authenticationServices/authentication-services.service";
import {MainBookingServicesService} from "../../services/mainBookingService/main-booking-services.service";
import {ContractServicesService} from "../../../../../shared/services/contractServices/contract-services.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking-confirmation-card',
  templateUrl: './booking-confirmation-card.component.html',
  styleUrls: ['./booking-confirmation-card.component.scss']
})
export class BookingConfirmationCardComponent implements OnInit {

  @Input() isViewBookingContext: any;
  @Input() bookingId: any;
  bookingDetails: any;
  rooms: any;
  supplements: any;
  discounts: any;
  bookedDate: any;
  checkInDate: any;
  checkOutDate: any;
  payment: any;
  finalPaymentDue: any;
  contract: any;
  userId: any;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private authenticationService: AuthenticationServicesService,
    private snackBar: MatSnackBar,
    private contractService: ContractServicesService,
    private bookingService: MainBookingServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authenticationService.getUserId();
    this.fetchBookingDetailsAndOtherDetails();
  }

  fetchBookingDetailsAndOtherDetails() {
    this.isLoading = true;
    this.bookingService.getBookingsByBookingId(this.bookingId).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.statusCode === 200) {
          this.bookingDetails = response.data;
          console.log(this.bookingDetails);
          this.rooms = this.bookingDetails?.rooms;
          this.supplements = this.bookingDetails?.supplements;
          this.discounts = this.bookingDetails?.discounts;
          this.payment = this.bookingDetails?.payment[0];
          this.bookedDate = new Date(this.bookingDetails?.bookingDate).toDateString();
          this.checkInDate = new Date(this.bookingDetails?.checkInDate).toDateString();
          this.checkOutDate = new Date(this.bookingDetails?.checkOutDate).toDateString();

          this.fetchContractDetails(this.bookingDetails?.contractId);
        }
      },
      error: (error) => {
        console.error(error);
        this.isError = true;
        this.isLoading = false;
      }
    });
  }

  fetchContractDetails(contractId: any){
    this.isLoading = true;
    this.contractService.getContractsById(contractId).subscribe(
      {
        next: (response: any) => {
          this.isLoading = false;
          if (response.statusCode === 200) {
            this.contract = response.data;
            console.log(this.contract)
            this.finalPaymentDate()
          }
        },
        error: (error) => {
          console.error(error);
          this.isError = true;
          this.isLoading = false;
        }
      }
    )
  }

  finalPaymentDate(): void {
    if (this.bookingDetails && this.contract) {
      const checkInDate = new Date(this.bookingDetails.checkInDate);
      this.finalPaymentDue = new Date(checkInDate.getTime() - (this.contract.balancePayment || 0)).toDateString();
    }
  }

  onCancelBooking(){
    if(this.checkNonPaymentEligibility()){
      this.isLoading = true;
      this.bookingService.cancelBooking(this.bookingId).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.statusCode === 200) {
            this.router.navigate(['main/myBookings/', this.userId]);
          }
        },
        error: (error) => {
          console.error(error);
          this.isError = true;
          this.isLoading = false;
        }
      });
    }else {
      this.snackBar.open('Cannot cancel booking, deadline exceeded.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }

  }

  checkNonPaymentEligibility(): boolean {
    if (this.bookingDetails && this.contract) {
      const checkInDate = new Date(this.bookingDetails.checkInDate);
      const finalEligibleDate = new Date(checkInDate.getTime() - (this.contract.cacellationDeadline || 0));
      const currentDate = new Date();
      return currentDate < finalEligibleDate;
    }
    return false;
  }

}
