import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  @Input() resultData: any;

  constructor(
    private router: Router
  ) {
  }
  viewHotelDetails(hotelId: number) {
    this.router.navigate(['/administration/hotel', hotelId]);
  }

}
