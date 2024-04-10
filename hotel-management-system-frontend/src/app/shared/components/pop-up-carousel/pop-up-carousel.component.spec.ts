import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCarouselComponent } from './pop-up-carousel.component';

describe('PopUpCarouselComponent', () => {
  let component: PopUpCarouselComponent;
  let fixture: ComponentFixture<PopUpCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpCarouselComponent]
    });
    fixture = TestBed.createComponent(PopUpCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
