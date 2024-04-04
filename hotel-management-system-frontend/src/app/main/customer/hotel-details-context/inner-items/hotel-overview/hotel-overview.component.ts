import {Component, Input, OnInit} from '@angular/core';
import {HotelServicesService} from "../../../../../shared/services/hotelServices/hotel-services.service";

@Component({
  selector: 'app-hotel-overview',
  templateUrl: './hotel-overview.component.html',
  styleUrls: ['./hotel-overview.component.scss']
})
export class HotelOverviewComponent implements OnInit{

  @Input() hotelDetails: any;
  slides: any[] = [];

  activeIndex = 0;

  constructor(
    private hotelServices: HotelServicesService) { }
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
    this.hotelServices.getHotelImages(this.hotelDetails?.hotelId).subscribe(
      (response) => {
        let hotelImages = response.data;
        this.slides = hotelImages.map((image: any) => {
          return {
            imageUrl: image.hotelImageURL
          };
        });
      },
      (error) => {
        console.error('Error fetching hotel images:', error);
      }
    );
  }
}
