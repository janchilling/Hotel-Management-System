import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MarkupServicesService} from "../../../../../../shared/services/markupServices/markup-services.service";
import {ActivatedRoute} from "@angular/router";
import {DateServiceService} from "../../../../../../shared/services/dateService/date-service.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponentComponent
} from "../../../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";
import {
  AuthenticationServicesService
} from "../../../../../../security/services/authenticationServices/authentication-services.service";
import {ContractServicesService} from "../../../../../../shared/services/contractServices/contract-services.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MainBookingServicesService} from "../../../../shared/services/mainBookingService/main-booking-services.service";

@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrls: ['./booking-payment.component.scss']
})
export class BookingPaymentComponent {

  @Input() contactDetails: any;
  @Input() bookingRooms: any;
  @Input() bookingSupplements: any;
  @Input() contractId: any;
  @Input() discount: any;
  @Input() noOfPersons: any;
  @Output() bookingPlaced = new EventEmitter<any>()
  markupDetails: any;
  checkInDate: any;
  checkOutDate: any;
  today: any;
  subtotal: number = 0;
  supplementsTotal: number = 0;
  selectedPaymentOption: string = 'full';
  isPrepaymentEligible: boolean = false;
  totalAfterDiscounts: number = 0;
  markupPercentage: number = 0;
  finalPrice: number = 0;
  discountedAmount: number = 0;
  tax: number = 0;
  customerId: any;
  hotelId: any;
  contract: any;
  cardDetailsForm: FormGroup;
  noOfDays: number = 0;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private markupServicesService: MarkupServicesService,
    private route: ActivatedRoute,
    private dateService: DateServiceService,
    private bookingServiceService :MainBookingServicesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationServicesService,
    private contractService: ContractServicesService,
    private formBuilder: FormBuilder
  ) {
    this.cardDetailsForm = this.formBuilder.group({
      cardHolder: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}')]],
      expiryDate: ['', [Validators.required, Validators.pattern('[0-9]{2}/[0-9]{2}')]],
      cvc: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'];
      this.checkOutDate = params['checkOut'];
      this.hotelId = params['hotelId'];
    });

    this.customerId = this.authenticationService.getUserId();
    this.today = new Date();
    this.noOfDays = Math.ceil((new Date(this.checkOutDate).getTime() - new Date(this.checkInDate).getTime()) / (1000 * 3600 * 24));

    this.getMarkupDetails()

    console.log(this.bookingRooms)
    this.fetchContract();
  }

  getMarkupDetails(){
      this.markupServicesService.getMarkupsByContractId(this.contractId).subscribe({
          next: (response: any) => {
              if (response.statusCode === 200) {
                console.log(response)
                  this.markupDetails = response.data[0];
                  console.log(this.markupDetails)
                  this.calculateTotals();
              }
          },
          error: (error) => {
              console.error('Error fetching contract:', error);
          }
      })
  }

  calculateTotals(): void {
    this.subtotal = +(this.bookingRooms.reduce((total: number, room: { bookedPrice: number;
      noOfRooms: number; }) => total + (room.bookedPrice * room.noOfRooms) * this.noOfDays, 0).toFixed(3));

    if (this.bookingSupplements && this.bookingSupplements.length > 0) {
      this.supplementsTotal = +(this.bookingSupplements.reduce((total: number, supplement: { supplementPrice: number;
        noOfRooms: number; }) => total + (supplement.supplementPrice * supplement.noOfRooms) * this.noOfDays, 0).toFixed(3));
    }

    this.totalAfterDiscounts = +(this.subtotal + this.supplementsTotal).toFixed(3);

    if (this.discount && this.discount.discountPercentage) {
      const discountPercentage = this.discount.discountPercentage;
      this.discountedAmount = +(this.totalAfterDiscounts * (discountPercentage / 100)).toFixed(3);
      this.discount.discountedAmount = this.discountedAmount;
      this.totalAfterDiscounts -= this.discountedAmount;
    }

    // Find applicable markup percentage based on season
    const currentDate = new Date();
    const seasonMarkup = this.markupDetails.seasonMarkups.find((season: { startDate: string | number | Date; endDate: string | number | Date; }) => {
      const startDate = new Date(season.startDate);
      const endDate = new Date(season.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    });

    if (this.markupDetails && seasonMarkup.markupPercentage) {
      const markupPercentage = seasonMarkup.markupPercentage;
      this.tax = +(this.totalAfterDiscounts * (markupPercentage / 100)).toFixed(3);
    } else {
      this.tax = 0;
    }

    // Apply markup percentage to final price
    this.finalPrice = +(this.totalAfterDiscounts + this.tax).toFixed(3);
  }

  checkPrepaymentEligibility(): void {
    const checkInDate = new Date(this.checkInDate);
    const today = new Date();
    const differenceInDays = Math.ceil((checkInDate.getTime() - this.today.getTime()) / (1000 * 3600 * 24));
    if(differenceInDays > this.contract.balancePayment) {
      this.isPrepaymentEligible = true;
    }
  }

  getTotal(): number {
    if (this.selectedPaymentOption === 'prepayment') {
      return this.finalPrice * this.contract.prepayment / 100;
    } else {
      return this.finalPrice;
    }
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to proceed with the payment?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createBooking();
      }
    });
  }

  createBooking(): void {
    this.isLoading = true;
    const paymentStatus = this.selectedPaymentOption === 'prepayment' ? 'Pre' : 'Full';

    const bookingRequest = {
      bookingDate: this.dateService.formatDate(this.today),
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      finalBookingPrice: this.finalPrice,
      subtotal: this.subtotal,
      supplementsTotal: this.supplementsTotal,
      discountedAmount: this.discountedAmount,
      tax: this.tax,
      noOfAdults: this.noOfPersons,
      bookingStatus: 'Confirmed',
      paymentStatus: paymentStatus,
      contractId: this.contractId,
      hotelHotelId: this.hotelId,
      customerCustomerId: this.customerId,
      contactEmail: this.contactDetails.email,
      contactPhone: this.contactDetails.phoneNumber,
      contactFirstName: this.contactDetails.firstName,
      contactLastName: this.contactDetails.lastName,
      payment: {
        paymentDate: this.dateService.formatDate(this.today),
        paymentAmount: this.getTotal(),
        paymentType: 'Credit Card'
      },
      bookingRooms: this.bookingRooms,
      bookingDiscounts : this.discount,
      bookingSupplements: this.bookingSupplements
    };

    console.log(bookingRequest)
    this.bookingServiceService.addBooking(bookingRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        if(response.statusCode == 201){
          this.bookingPlaced.emit(response.data);
        }else {
          this.snackBar.open('Could not create booking', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top'
          });
        }

      },
      error: (error) => {
        this.isLoading = false;
        console.error('Booking adding hotel:', error);
      }
    })
  }

  fetchContract(){
    this.contractService.getContractsById(this.contractId).subscribe({
      next: (response: any) => {
        if (response.statusCode === 200) {
          this.contract = response.data;
          this.checkPrepaymentEligibility();
        } else {
          console.error('Error fetching contract:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching contract:', error);
      }
    })
  }

}
