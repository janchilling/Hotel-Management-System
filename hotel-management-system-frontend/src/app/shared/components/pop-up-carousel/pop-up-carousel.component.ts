import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-pop-up-carousel',
  templateUrl: './pop-up-carousel.component.html',
  styleUrls: ['./pop-up-carousel.component.scss']
})
export class PopUpCarouselComponent implements OnInit{

  slides: any[] = [];
  activeIndex = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.slides = data.slides;
  }

  ngOnInit(): void {
    console.log(this.slides)
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

}
