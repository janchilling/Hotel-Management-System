import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent {

  @Input () hotelDetails: any

  constructor(
    private router: Router
  ) {
  }
  addContract(hotelId: any) {
    console.log("Clicked")
    this.router.navigate(['/administration/addContract', hotelId]);
  }

}
