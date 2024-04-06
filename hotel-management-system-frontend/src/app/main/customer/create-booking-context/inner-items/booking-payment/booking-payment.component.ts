import {Component, Input} from '@angular/core';
import {MarkupServicesService} from "../../../../../shared/services/markupServices/markup-services.service";
import {ActivatedRoute} from "@angular/router";
import {DateServiceService} from "../../../../../shared/services/dateService/date-service.service";
import {BookingServiceService} from "../../../../../shared/services/bookingService/booking-service.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponentComponent
} from "../../../../../shared/components/confirmation-dialog-component/confirmation-dialog-component.component";

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

  constructor(
    private markupServicesService: MarkupServicesService,
    private route: ActivatedRoute,
    private dateService: DateServiceService,
    private bookingServiceService :BookingServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'];
      this.checkOutDate = params['checkOut'];
    });

    this.today = new Date();

    this.markupServicesService.getMarkupsByContractId(this.contractId).subscribe(data => {
      this.markupDetails = data[0];
      this.calculateTotals();
      console.log(this.finalPrice)
    });

    this.checkPrepaymentEligibility();
    console.log(this.bookingRooms)
    console.log(this.bookingSupplements)
    console.log(this.discount)
  }

  calculateTotals(): void {
    this.subtotal = +(this.bookingRooms.reduce((total: number, room: { bookedPrice: number; noOfRooms: number; }) => total + (room.bookedPrice * room.noOfRooms), 0).toFixed(3));

    if (this.bookingSupplements && this.bookingSupplements.length > 0) {
      this.supplementsTotal = +(this.bookingSupplements.reduce((total: number, supplement: { supplementPrice: number; noOfRooms: number; }) => total + (supplement.supplementPrice * supplement.noOfRooms), 0).toFixed(3));
    }

    this.totalAfterDiscounts = +(this.subtotal + this.supplementsTotal).toFixed(3);

    if (this.discount && this.discount.discountPercentage) {
      const discountPercentage = this.discount.discountPercentage;
      this.discountedAmount = +(this.totalAfterDiscounts * (discountPercentage / 100)).toFixed(3);
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
    if(differenceInDays > 3) {
      this.isPrepaymentEligible = true;
    }
  }

  getTotal(): number {
    if (this.selectedPaymentOption === 'prepayment') {
      return this.finalPrice * 0.25; // 25% prepayment
    } else {
      return this.finalPrice; // Full payment
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
    const paymentStatus = this.selectedPaymentOption === 'prepayment' ? 'Pre' : 'Full';

    const bookingRequest = {
      bookingDate: this.dateService.formatDate(this.today),
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      finalBookingPrice: this.finalPrice,
      noOfAdults: 5, // Get the number of adults
      bookingStatus: 'Confirmed',
      paymentStatus: paymentStatus, // Set paymentStatus based on payment option
      hotelHotelId: 1,
      customerCustomerId: 1,
      payment: {
        paymentDate: this.dateService.formatDate(this.today),
        paymentAmount: this.getTotal(),
        paymentType: 'Credit Card'
      },
      bookingRooms: this.bookingRooms,
      bookingDiscounts: [{
        discountCode: this.discount.discountCode,
        discountId: this.discount.discountId,
        discountedAmount: this.discountedAmount
      }],
      bookingSupplements: this.bookingSupplements
    };

    console.log(bookingRequest)

    this.bookingServiceService.addBooking(bookingRequest).subscribe({
      next: (response) => {
        console.log('Booking added successfully:', response);
        console.log(response)
      },
      error: (error) => {
        console.error('Booking adding hotel:', error);
      }
    })
  }


}
