import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})
export class RoomCardComponent implements OnInit {
  @Input() roomType: any;
  @Input() supplements: any;
  @Input() showSelectSupplements: boolean = true;
  roomTypePrice: number | undefined;
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract check-in and check-out dates from URL parameters
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'] ? new Date(params['checkIn']) : undefined;
      this.checkOutDate = params['checkOut'] ? new Date(params['checkOut']) : undefined;

      // Calculate the room type price based on the season
      if (this.checkInDate && this.checkOutDate) {
        this.calculateRoomTypePrice();
      }

      if (this.supplements && this.checkInDate && this.checkOutDate) {
        this.calculateSupplementPrices();
      }
    });
  }

  calculateRoomTypePrice(): void {
    const checkInDate = this.checkInDate as Date;
    const checkOutDate = this.checkOutDate as Date;
    const seasonRoomtypes = this.roomType.seasonRoomtype;

    const matchingSeason = seasonRoomtypes.find((season: { startDate: string | number | Date; endDate: string | number | Date; }) => {
      const startDate = new Date(season.startDate);
      const endDate = new Date(season.endDate);
      return checkInDate >= startDate && checkOutDate <= endDate;
    });

    if (matchingSeason) {
      this.roomTypePrice = matchingSeason.roomPrice;
    }
  }

  calculateSupplementPrices(): void {
    const checkInDate = this.checkInDate as Date;
    const checkOutDate = this.checkOutDate as Date;

    this.supplements.forEach((supplement: any) => {
      supplement.supplementsSeasons.forEach((season: { startDate: string | number | Date; endDate: string | number | Date; supplementPrice: number; }) => {
        const startDate = new Date(season.startDate);
        const endDate = new Date(season.endDate);

        if (checkInDate >= startDate && checkOutDate <= endDate) {
          supplement.price = season.supplementPrice;
        }
      });
    });
  }
}
