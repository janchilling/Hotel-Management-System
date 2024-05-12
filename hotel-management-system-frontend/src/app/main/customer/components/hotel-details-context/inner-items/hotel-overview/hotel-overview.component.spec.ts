// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { HotelOverviewComponent } from './hotel-overview.component';
// import { HotelServicesService } from 'src/app/shared/services/hotelServices/hotel-services.service';
//
// describe('HotelOverviewComponent', () => {
//   let component: HotelOverviewComponent;
//   let fixture: ComponentFixture<HotelOverviewComponent>;
//   let hotelServicesSpy: jasmine.SpyObj<HotelServicesService>;
//
//   beforeEach(() => {
//     // Create a spy object for HotelServicesService
//     const spy = jasmine.createSpyObj('HotelServicesService', ['getHotelImages']);
//
//     TestBed.configureTestingModule({
//       declarations: [HotelOverviewComponent],
//       providers: [{ provide: HotelServicesService, useValue: spy }],
//     });
//
//     fixture = TestBed.createComponent(HotelOverviewComponent);
//     component = fixture.componentInstance;
//     hotelServicesSpy = TestBed.inject(HotelServicesService) as jasmine.SpyObj<HotelServicesService>;
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
