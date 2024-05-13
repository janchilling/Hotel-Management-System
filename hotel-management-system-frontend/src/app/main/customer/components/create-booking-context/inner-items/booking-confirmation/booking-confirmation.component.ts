import {Component, Input} from '@angular/core';

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
      this.error = true;
    }
  }

}
