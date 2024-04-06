import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-all-booking-result-cards',
  templateUrl: './all-booking-result-cards.component.html',
  styleUrls: ['./all-booking-result-cards.component.scss']
})
export class AllBookingResultCardsComponent {

  @Input () booking: any;
  constructor(
    private router: Router
  ) {
  }

  viewBookingDetails(bookingId: number) {
    this.router.navigate(['/main/booking', bookingId]);
  }

}
