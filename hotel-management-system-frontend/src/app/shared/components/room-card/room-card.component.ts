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
  @Input() showSelectSupplements: boolean = false;
  @Input() showSelectDetails: boolean = false;
  roomTypePrice: any;
  checkInDate: any;
  checkOutDate: any;
  numRooms: number = 0;
  selectedSupplements: any[] = [];

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
    const seasonRoomtypes = this.roomType?.seasonRoomtype;

    if (!seasonRoomtypes) {
      return;
    }

    const matchingSeason = seasonRoomtypes.find((season: { startDate: string | number | Date; endDate: string | number | Date; }) => {

      const startDate = new Date(season.startDate);
      const endDate = new Date(season.endDate);
      return checkInDate >= startDate && checkOutDate <= endDate;
    });

    if (matchingSeason) {
      this.roomTypePrice = matchingSeason.roomTypePrice;
    } else {
      console.log("No matching season found or room price is undefined.");
    }
  }


  calculateSupplementPrices(): void {
    const checkInDate = this.checkInDate as Date;
    const checkOutDate = this.checkOutDate as Date;

    this.supplements.forEach((supplement: any) => {
      supplement.seasonSupplements.forEach((season: { startDate: string | number | Date; endDate: string | number | Date; supplementPrice: number; }) => {
        const startDate = new Date(season.startDate);
        const endDate = new Date(season.endDate);

        if (checkInDate >= startDate && checkOutDate <= endDate) {
          supplement.price = season.supplementPrice;
        }
      });
    });
  }

  incrementRooms(): void {
    this.numRooms++;
  }

  decrementRooms(): void {
    if (this.numRooms > 0) {
      this.numRooms--;
    }
  }

  selectSupplement(supplement: any): void {
    supplement.selected = !supplement.selected; // Toggle selected state

    // Check if the supplement is already selected for this room type
    const existingIndex = this.selectedSupplements.findIndex(item => item.roomType === this.roomType.roomTypeName);

    if (supplement.selected) {
      // If the supplement is selected, add it to the selected supplements for this room type
      if (existingIndex === -1) {
        this.selectedSupplements.push({ roomType: this.roomType.roomTypeName, supplements: [supplement] });
      } else {
        this.selectedSupplements[existingIndex].supplements.push(supplement);
      }
    } else {
      // If the supplement is deselected, remove it from the selected supplements for this room type
      if (existingIndex !== -1) {
        const supplementIndex = this.selectedSupplements[existingIndex].supplements.findIndex((item: any) => item === supplement);
        if (supplementIndex !== -1) {
          this.selectedSupplements[existingIndex].supplements.splice(supplementIndex, 1);
        }
      }
    }
  }

  isSupplementSelected(supplement: any): boolean {
    // Check if the supplement is selected for this room type
    const existingIndex = this.selectedSupplements.findIndex(item => item.roomType === this.roomType.roomTypeName);
    if (existingIndex !== -1) {
      return this.selectedSupplements[existingIndex].supplements.includes(supplement);
    }
    return false;
  }
}
