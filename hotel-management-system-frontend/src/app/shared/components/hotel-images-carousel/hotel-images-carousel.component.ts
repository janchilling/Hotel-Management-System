import {Component, Input} from '@angular/core';
import {HotelServicesService} from "../../services/hotelServices/hotel-services.service";
import {
  ConfirmationDialogComponentComponent
} from "../confirmation-dialog-component/confirmation-dialog-component.component";
import {MatDialog} from "@angular/material/dialog";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-hotel-images-carousel',
  templateUrl: './hotel-images-carousel.component.html',
  styleUrls: ['./hotel-images-carousel.component.scss']
})
export class HotelImagesCarouselComponent {

  @Input() hotelId: any;
  slides: any[] = [];
  loading: boolean = true;
  activeIndex = 0;
  @Input() updateHotelVisible: boolean = false;

  constructor(
    private hotelServices: HotelServicesService,
    private dialog: MatDialog,
    private locationStrategy: LocationStrategy
  ) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this.slides.length - 1;
  }

  fetchImages() {
    this.loading = true;
    this.hotelServices.getHotelImages(this.hotelId).subscribe(
      {
        next: (response) => {
          if (response.statusCode === 200) {
            console.log(response.data);
            let hotelImages = response.data;
            this.slides = hotelImages.map((image: any) => {
              return {
                hotelImageId: image.hotelImageId,
                imageUrl: image.hotelImageURL
              };
            });
          } else {
            console.error('Error fetching hotel images:', response.message);
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching hotel images:', error);
          this.loading = false;
        }
      }
    );
  }

  handleRemoveImage(hotelImageId: any, hotelImageURL: any) {
    this.confirmationDialog(hotelImageId, hotelImageURL)
  }

  confirmationDialog(hotelImageId: any, hotelImageURL: any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '300px',
      data: 'Are you sure you want to remove this image?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeImage(hotelImageId, hotelImageURL);
      }
    });
  }

  removeImage(hotelImageId: any, imageUrl: string) {
    console.log(imageUrl)
    // First, delete from Firebase
    this.hotelServices.deleteImageFromFirebase(imageUrl).subscribe({
      next: (firebaseResponse) => {
        if (firebaseResponse.statusCode === 200) {
          this.hotelServices.deleteImageDatabase(this.hotelId, hotelImageId).subscribe({
            next: (mysqlResponse) => {
              if (mysqlResponse.statusCode === 200) {
                this.reloadCurrentUrl();
              } else {
                console.error('Error deleting image from MySQL:', mysqlResponse.message);
              }
            },
            error: (mysqlError) => {
              console.error('Error deleting image from MySQL:', mysqlError);
            }
          });
        } else {
          console.error('Error deleting image from Firebase:', firebaseResponse.message);
        }
      },
      error: (firebaseError) => {
        console.error('Error deleting image from Firebase:', firebaseError);
      }
    });
  }

  reloadCurrentUrl() {
    const currentUrl = this.locationStrategy.path(true);
    window.location.assign(currentUrl);
  }

}
