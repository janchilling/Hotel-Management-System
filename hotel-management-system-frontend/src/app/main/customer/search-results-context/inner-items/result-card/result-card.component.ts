import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {
  @Input() hotel: any;
  @Input() checkIn: any;
  @Input() checkOut: any;

  constructor(private router: Router) {}
  viewHotelDetails(hotelId: number) {
    this.router.navigate(['/main/hotel', hotelId], { queryParams: { checkIn: this.checkIn, checkOut: this.checkOut } });
  }

  getStars(rating: number): any[] {
    return Array(rating).fill(0); // Creates an array of length 'rating' filled with zeros
  }
}
