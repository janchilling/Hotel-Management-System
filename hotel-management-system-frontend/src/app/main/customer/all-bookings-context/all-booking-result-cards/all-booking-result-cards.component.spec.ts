import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingResultCardsComponent } from './all-booking-result-cards.component';
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";

describe('AllBookingResultCardsComponent', () => {
  let component: AllBookingResultCardsComponent;
  let fixture: ComponentFixture<AllBookingResultCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBookingResultCardsComponent],
      imports: [RouterTestingModule], // Import RouterTestingModule for routing functionality
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBookingResultCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render booking details correctly', () => {
    const bookingData = {
      bookingId: 123,
      hotelName: 'Example Hotel',
      checkInDate: '2024-04-10',
      checkOutDate: '2024-04-15'
    };
    component.booking = bookingData;
    fixture.detectChanges();

    const hotelNameElement = fixture.debugElement.query(By.css('.subheading h2'));
    expect(hotelNameElement.nativeElement.textContent).toContain(bookingData.hotelName);

    const checkInDateElement = fixture.debugElement.query(By.css('.icon1:nth-child(1)'));
    expect(checkInDateElement.nativeElement.textContent).toContain(bookingData.checkInDate);

    const checkOutDateElement = fixture.debugElement.query(By.css('.icon1:nth-child(2)'));
    expect(checkOutDateElement.nativeElement.textContent).toContain(bookingData.checkOutDate);
  });

  it('should navigate to booking details on button click', () => {
    const bookingId = 123;
    spyOn(component.router, 'navigate');

    const button = fixture.debugElement.query(By.css('app-main-button'));
    button.triggerEventHandler('click', null);

    expect(component.router.navigate).toHaveBeenCalledWith(['/main/booking', bookingId]);
  });
});
