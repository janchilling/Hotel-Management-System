import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RoomTypeServicesService} from "../../../../../shared/services/roomTypesServices/room-type-services.service";
import {DateServiceService} from "../../../../../shared/services/dateService/date-service.service";
import {PopUpCarouselComponent} from "../../../../../shared/components/pop-up-carousel/pop-up-carousel.component";
import {PopUpMoreInfoComponent} from "../pop-up-more-info/pop-up-more-info.component";

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
  @Output() roomSelected = new EventEmitter<any>();
  roomTypePrice: any;
  checkInDate: any;
  checkOutDate: any;
  numRooms: any = 0;
  availableRooms: any;
  seasonId:  any;
  selectedSupplements: any[] = [];
  totalPrice: number = 0;
  slides: any[] = [];
  maxAdults: number = 0;
  showPopupCarousel = false;

  constructor(
    private route: ActivatedRoute,
    private roomTypeServicesService :RoomTypeServicesService,
    private snackBar: MatSnackBar,
    private dateService: DateServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      // First getting the check-in and check-out dates from the URL
      this.checkInDate = params['checkIn'] ? new Date(params['checkIn']) : undefined;
      this.checkOutDate = params['checkOut'] ? new Date(params['checkOut']) : undefined;

      // Getting the season id and the room type price according to the season
      if (this.checkInDate && this.checkOutDate) {
        this.getRoomTypePriceAndSetSeasonId();
      }

      // Getting the supplement prices according to the season
      if (this.supplements && this.checkInDate && this.checkOutDate) {
        this.getSupplementPrices();
      }

      // Setting the number of rooms available in the room type of the particular Hotel
      this.roomTypeServicesService.availableNoOfRooms(this.roomType.roomTypeId, this.checkInDate, this.checkOutDate, this.seasonId).subscribe((data: any) => {
        this.availableRooms = data.data;
      })
    });
    this.slides = this.roomType?.roomTypeImages
  }

  getRoomTypePriceAndSetSeasonId(): void {
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
      this.seasonId = matchingSeason.seasonId;
    } else {
      console.log("No matching season found or room price is undefined.");
    }
  }

  getSupplementPrices(): void {
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
    if (this.numRooms < this.availableRooms) {
      this.numRooms++;
      this.updateRoomData();
    }
    this.calculateTotalPrice()
  }

  decrementRooms(): void {
    if (this.numRooms > 0) {
      this.numRooms--;
      this.updateRoomData();
    }
    this.calculateTotalPrice();
  }

  selectSupplement(supplement: any): void {
    // Check if the number of rooms is greater than 0
    if (this.numRooms > 0) {
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
        this.calculateTotalPrice()
        this.updateRoomData();
      } else {
        // If the supplement is deselected, remove it from the selected supplements for this room type
        if (existingIndex !== -1) {
          const supplementIndex = this.selectedSupplements[existingIndex].supplements.findIndex((item: any) => item === supplement);
          if (supplementIndex !== -1) {
            this.selectedSupplements[existingIndex].supplements.splice(supplementIndex, 1);
          }
        }
        this.calculateTotalPrice()
        this.updateRoomData();
      }
    } else {
      // Show snackbar notification to add rooms
      this.snackBar.open('Please add rooms before selecting supplements.', 'Close', {
        duration: 3000, // Duration in milliseconds
        verticalPosition: 'top'
      });
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

  calculateTotalPrice(): void {
    let totalSupplementPrice = 0;
    this.selectedSupplements.forEach((selectedSupplement) => {
      selectedSupplement.supplements.forEach((supplement: any) => {
        totalSupplementPrice += supplement.price * this.numRooms;
      });
    });
    const roomPrice = this.roomTypePrice * this.numRooms;
    this.totalPrice = roomPrice + totalSupplementPrice;
  }

  updateRoomData() {
    if (this.numRooms === 0) {
      this.selectedSupplements = [];
    }
    const bookingRooms = {
      noOfRooms: this.numRooms,
      roomTypeName: this.roomType.roomTypeName,
      bookedPrice: this.roomTypePrice,
      roomTypeId: this.roomType.roomTypeId,
      maxAdults: this.roomType.maxAdults,
      checkInDate: this.dateService.formatDate(this.checkInDate),
      checkOutDate: this.dateService.formatDate(this.checkOutDate),
      imageURL: this.roomType.roomTypeImages[0].roomTypeImageUrl,
    };

    const bookingSupplements = this.selectedSupplements.flatMap((selectedSupplement) => {
      return selectedSupplement.supplements.map((supplement: any) => {
        return {
          supplementPrice: supplement.price,
          supplementName: supplement.supplementName,
          supplementId: supplement.supplementId,
          roomTypeId: this.roomType.roomTypeId,
          noOfRooms: this.numRooms
        };
      });
    });

    const selectedRoomData = {
      bookingRooms: [bookingRooms],
      bookingSupplements: bookingSupplements
    };
    this.roomSelected.emit(selectedRoomData);
  }

  openCarouselDialog(): void {
    this.dialog.open(PopUpCarouselComponent, {
      width: '80vw',
      height: '53vh',
      panelClass: 'pop-up-carousel-dialog',
      data: { slides: this.slides }
    });
  }

  openMoreInfoPopup(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.data = { roomType: this.roomType, roomTypePrice: this.roomTypePrice, slides: this.slides };

    this.dialog.open(PopUpMoreInfoComponent, dialogConfig);
  }

}
