// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { BookingConfirmationCardComponent } from './booking-confirmation-card.component';
//
// describe('BookingConfirmationCardComponent', () => {
//   let component: BookingConfirmationCardComponent;
//   let fixture: ComponentFixture<BookingConfirmationCardComponent>;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [BookingConfirmationCardComponent]
//     });
//
//     fixture = TestBed.createComponent(BookingConfirmationCardComponent);
//     component = fixture.componentInstance;
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   // it('should render booking details correctly', () => {
//   //   const bookingDetails = {
//   //     bookingId: 123,
//   //     bookingDate: new Date('2024-04-10'),
//   //     checkInDate: new Date('2024-04-12'),
//   //     checkOutDate: new Date('2024-04-14'),
//   //     contactFirstName: 'John',
//   //     contactLastName: 'Doe',
//   //     contactEmail: 'johndoe@example.com',
//   //     contactPhone: '+1234567890',
//   //     finalBookingPrice: 500,
//   //     supplementsTotal: 50,
//   //     discountedAmount: 0,
//   //     tax: 25,
//   //     paymentStatus: 'Full',
//   //     rooms: [
//   //       {
//   //         roomTypeName: 'Standard',
//   //         bookedPrice: 100,
//   //         noOfRooms: 2,
//   //         roomTypeId: 1
//   //       },
//   //       {
//   //         roomTypeName: 'Deluxe',
//   //         bookedPrice: 150,
//   //         noOfRooms: 1,
//   //         roomTypeId: 2
//   //       }
//   //     ],
//   //     supplements: [
//   //       { roomTypeId: 1, supplementName: 'Breakfast', supplementPrice: 25 },
//   //       { roomTypeId: 1, supplementName: 'WiFi', supplementPrice: 15 }
//   //     ],
//   //     discounts: [],
//   //     payment: [{ paymentAmount: 500, paymentType: 'Credit Card' }]
//   //   };
//   //
//   //   component.bookingDetails = bookingDetails;
//   //   fixture.detectChanges();
//   //
//   //   // Get the native element for inspection
//   //   const element = fixture.nativeElement;
//   //
//   //   // Expectations for booking information
//   //   expect(element.querySelector('h1').textContent).toContain(`Booking #${bookingDetails.bookingId}`);
//   //   expect(element.querySelector('.text-base').textContent).toContain(`Booked on ${new Date(bookingDetails.bookingDate).toDateString()}`);
//   //
//   //   // Expectations for room details
//   //   const roomElements = element.querySelectorAll('.flex-col');
//   //   expect(roomElements.length).toBe(2); // Assuming two rooms are rendered
//   //
//   //   // Check specific room details
//   //   const room1 = roomElements[0];
//   //   expect(room1.querySelector('.text-xl').textContent).toContain('Standard Room(s)');
//   //   expect(room1.querySelector('.text-sm').textContent).toContain('Breakfast at USD 25 per Room');
//   //   expect(room1.querySelector('.text-gray-800').textContent).toContain('USD 200'); // Calculated price for room 1
//   //
//   //   // Check payment details
//   //   expect(element.querySelector('.text-gray-800').textContent).toContain(`USD ${bookingDetails.finalBookingPrice}`);
//   //
//   //   // Check customer details
//   //   expect(element.querySelector('.text-base').textContent).toContain(`${bookingDetails.contactFirstName} ${bookingDetails.contactLastName}`);
//   //   expect(element.querySelector('.text-sm').textContent).toContain('10 Previous Orders');
//   //   expect(element.querySelector('.text-lg').textContent).toContain(`USD ${bookingDetails.payment[0].paymentAmount}`);
//   //   expect(element.querySelector('.text-lg').textContent).toContain(`Payment Status: ${bookingDetails.paymentStatus} Amount Paid`);
//   //   expect(element.querySelector('.text-lg').textContent).toContain(`Payment Method: ${bookingDetails.payment[0].paymentType}`);
//   // });
// });
