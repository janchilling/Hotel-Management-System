import {Component, Input} from '@angular/core';
import {BookingServiceService} from "../../../../../shared/services/bookingService/booking-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent {

  @Input() bookingDetails: any;
  loading: boolean = false;
  error: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {
    if (this.bookingDetails) {
      this.loading = false;
      this.error = false;
    } else {
      this.loading = true;
      this.error = true; // For example, assuming error if no booking details are provided
    }
  }

}
