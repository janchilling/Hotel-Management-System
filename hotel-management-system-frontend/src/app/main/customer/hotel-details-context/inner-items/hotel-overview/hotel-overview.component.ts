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
  loading: boolean = true;
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
    this.loading = true; // Set loading to true when fetching images
    this.hotelServices.getHotelImages(this.hotelDetails?.hotelId).subscribe(
      {
      next: (response) => {
      if (response.statusCode === 200) {
        let hotelImages = response.data;
        this.slides = hotelImages.map((image: any) => {
          return {
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
}
