import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOverviewComponent } from './hotel-overview.component';
import { HotelServicesService } from 'src/app/shared/services/hotelServices/hotel-services.service';
import {of} from "rxjs";

describe('HotelOverviewComponent', () => {
  let component: HotelOverviewComponent;
  let fixture: ComponentFixture<HotelOverviewComponent>;
  let hotelServicesSpy: jasmine.SpyObj<HotelServicesService>;

  beforeEach(() => {
    // Create a spy object for HotelServicesService
    const spy = jasmine.createSpyObj('HotelServicesService', ['getHotelImages']);

    TestBed.configureTestingModule({
      declarations: [HotelOverviewComponent],
      providers: [{ provide: HotelServicesService, useValue: spy }],
    });

    fixture = TestBed.createComponent(HotelOverviewComponent);
    component = fixture.componentInstance;
    hotelServicesSpy = TestBed.inject(HotelServicesService) as jasmine.SpyObj<HotelServicesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch hotel images on initialization', () => {
    const hotelDetails = { hotelId: 'exampleHotelId' };
    const mockImages = [{ hotelImageURL: 'image1.jpg' }, { hotelImageURL: 'image2.jpg' }];

    // Set up the spy to return a mocked observable with the hotel images
    hotelServicesSpy.getHotelImages.and.returnValue(of({ statusCode: 200, data: mockImages }));

    component.hotelDetails = hotelDetails;
    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.loading).toBeFalse();
    expect(component.slides.length).toBe(2);
    expect(component.slides[0].imageUrl).toBe('image1.jpg');
    expect(component.slides[1].imageUrl).toBe('image2.jpg');
  });

  it('should set activeIndex to 0 on initialization', () => {
    expect(component.activeIndex).toBe(0);
  });

  it('should set activeIndex correctly when calling setActiveIndex', () => {
    component.setActiveIndex(2);
    expect(component.activeIndex).toBe(2);
  });

  it('should increment activeIndex correctly when calling nextSlide', () => {
    component.slides = [{ imageUrl: 'image1.jpg' }, { imageUrl: 'image2.jpg' }];
    component.activeIndex = 0;
    component.nextSlide();
    expect(component.activeIndex).toBe(1);
    component.nextSlide(); // Wrap around to the start
    expect(component.activeIndex).toBe(0);
  });

  it('should decrement activeIndex correctly when calling prevSlide', () => {
    component.slides = [{ imageUrl: 'image1.jpg' }, { imageUrl: 'image2.jpg' }];
    component.activeIndex = 1;
    component.prevSlide();
    expect(component.activeIndex).toBe(0);
    component.prevSlide(); // Wrap around to the end
    expect(component.activeIndex).toBe(1);
  });
});
