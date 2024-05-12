// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { ResultCardComponent } from './result-card.component';
// import {Router} from "@angular/router";
// import {RouterTestingModule} from "@angular/router/testing";
// import {By} from "@angular/platform-browser";
// import {SharedModule} from "../../../../../../shared/shared.module";
//
// describe('ResultCardComponent', () => {
//   let component: ResultCardComponent;
//   let fixture: ComponentFixture<ResultCardComponent>;
//   let router: Router;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ResultCardComponent],
//       imports: [RouterTestingModule, SharedModule],
//     });
//
//     fixture = TestBed.createComponent(ResultCardComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);
//
//     // Provide dummy data for hotel input
//     component.hotel = {
//       hotelId: 1,
//       hotelName: 'Test Hotel',
//       hotelStreetAddress: '123 Test St',
//       hotelPostalCode: '12345',
//       hotelCity: 'Test City',
//       hotelCountry: 'Test Country',
//       hotelBriefDescription: 'Test description',
//     };
//
//     // Trigger change detection
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should navigate to hotel details with correct parameters on viewHotelDetails call', () => {
//     const checkIn = '2024-04-10';
//     const checkOut = '2024-04-12';
//     const navigateSpy = spyOn(router, 'navigate');
//
//     // Set check-in and check-out dates
//     component.checkIn = checkIn;
//     component.checkOut = checkOut;
//
//     // Simulate button click
//     const button = fixture.debugElement.query(By.css('app-main-button')).nativeElement;
//     button.click();
//
//     // Check navigation call
//     expect(navigateSpy).toHaveBeenCalledWith(['/main/hotel', component.hotel.hotelId], {
//       queryParams: { checkIn: checkIn, checkOut: checkOut },
//     });
//   });
// });
