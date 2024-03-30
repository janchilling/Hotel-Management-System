import {Component, Input} from '@angular/core';
import {MarkupServicesService} from "../../../../../shared/services/markupServices/markup-services.service";
import {ActivatedRoute} from "@angular/router";

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

  subtotal: number = 0;
  supplementsTotal: number = 0;
  discountedSupplementsTotal: number = 0;
  totalAfterDiscounts: number = 0;
  markupPercentage: number = 0;
  finalPrice: number = 0;

  constructor(
    private markupServicesService: MarkupServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'];
      this.checkOutDate = params['checkOut'];
    });

    this.markupServicesService.getMarkupsByContractId(this.contractId).subscribe(data => {
      this.markupDetails = data[0];
      this.calculateTotals();
      console.log(this.finalPrice)
    });
  }

  calculateTotals(): void {
    // Calculate subtotal
    this.subtotal = this.bookingRooms.reduce((total: number, room: { bookedPrice: number; noOfRooms: number; }) => total + (room.bookedPrice * room.noOfRooms), 0);

    // Calculate supplements total if supplements exist
    if (this.bookingSupplements && this.bookingSupplements.length > 0) {
      this.supplementsTotal = this.bookingSupplements.reduce((total: number, supplement: { supplementPrice: number; noOfRooms: number; }) => total + (supplement.supplementPrice * supplement.noOfRooms), 0);
    }

    // Calculate total after discounts
    this.totalAfterDiscounts = this.subtotal;

    // Apply discounts if available
    if (this.discount && this.discount.discountPercentage) {
      const discountPercentage = this.discount.discountPercentage;
      const discountAmount = this.totalAfterDiscounts * (discountPercentage / 100);
      this.totalAfterDiscounts -= discountAmount;
    }

    // Calculate discounted supplements total if supplements exist and discounts are applied
    this.discountedSupplementsTotal = this.totalAfterDiscounts + this.supplementsTotal;

    // Find applicable markup percentage based on season
    const currentDate = new Date();
    const seasonMarkup = this.markupDetails.seasonMarkups.find((season: { startDate: string | number | Date; endDate: string | number | Date; }) => {
      const startDate = new Date(season.startDate);
      const endDate = new Date(season.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    });

    if (seasonMarkup) {
      this.markupPercentage = seasonMarkup.markupPercentage;
    }

    // Apply markup percentage to final price
    this.finalPrice = this.discountedSupplementsTotal * (1 + (this.markupPercentage / 100));
  }

}
