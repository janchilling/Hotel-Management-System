import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hotel-overview',
  templateUrl: './hotel-overview.component.html',
  styleUrls: ['./hotel-overview.component.scss']
})
export class HotelOverviewComponent{

  @Input() hotelDetails: any;

}
