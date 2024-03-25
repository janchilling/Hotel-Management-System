import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-overview',
  templateUrl: './hotel-overview.component.html',
  styleUrls: ['./hotel-overview.component.scss']
})
export class HotelOverviewComponent {
  @Input() hotelDetails: any;

  slides = [
    {
      imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg',
      label: 'First slide label',
      content: 'Some representative placeholder content for the first slide.'
    },
    {
      imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg',
      label: 'Second slide label',
      content: 'Some representative placeholder content for the second slide.'
    },
    {
      imageUrl: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg',
      label: 'Third slide label',
      content: 'Some representative placeholder content for the third slide.'
    }
  ];

  activeIndex = 0;

  setActiveIndex(index: number) {
    this.activeIndex = index;
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : this.slides.length - 1;
  }
}
