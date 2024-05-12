// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { HotelRoomComponent } from './hotel-room.component';
// import {ActivatedRoute} from "@angular/router";
// import {of} from "rxjs";
// import {MatSnackBarModule} from "@angular/material/snack-bar";
// import {RoomTypeServicesService} from "../../../../../../shared/services/roomTypesServices/room-type-services.service";
// import {
//   SupplementServicesService
// } from "../../../../../../shared/services/supplementServices/supplement-services.service";
// import {SharedModule} from "../../../../../../shared/shared.module";
//
// describe('HotelRoomComponent', () => {
//   let component: HotelRoomComponent;
//   let fixture: ComponentFixture<HotelRoomComponent>;
//   let roomTypeServiceSpy: jasmine.SpyObj<RoomTypeServicesService>;
//   let supplementServiceSpy: jasmine.SpyObj<SupplementServicesService>;
//
//   beforeEach(() => {
//     const roomTypeSpy = jasmine.createSpyObj('RoomTypeServicesService', ['getRoomsByContractId']);
//     const supplementSpy = jasmine.createSpyObj('SupplementServicesService', ['getSupplementsByContractId']);
//
//     TestBed.configureTestingModule({
//       declarations: [HotelRoomComponent],
//       imports: [SharedModule, MatSnackBarModule],
//       providers: [
//         { provide: RoomTypeServicesService, useValue: roomTypeSpy },
//         { provide: SupplementServicesService, useValue: supplementSpy },
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             queryParams: of({ checkIn: '2024-04-10', checkOut: '2024-04-12' }),
//           },
//         },
//       ],
//     });
//
//     fixture = TestBed.createComponent(HotelRoomComponent);
//     component = fixture.componentInstance;
//     roomTypeServiceSpy = TestBed.inject(RoomTypeServicesService) as jasmine.SpyObj<RoomTypeServicesService>;
//     supplementServiceSpy = TestBed.inject(SupplementServicesService) as jasmine.SpyObj<SupplementServicesService>;
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
// //   it('should fetch room types and supplements on initialization', () => {
// //     const mockRoomTypes = [{ roomTypeName: 'Standard Room' }, { roomTypeName: 'Deluxe Room' }];
// //     const mockSupplements = [{ supplementName: 'Breakfast' }, { supplementName: 'Spa Access' }];
// //
// //     roomTypeServiceSpy.getRoomsByContractId.and.returnValue(of({ statusCode: 200, data: mockRoomTypes }));
// //     supplementServiceSpy.getSupplementsByContractId.and.returnValue(of({ statusCode: 200, data: mockSupplements }));
// //
// //     component.contractId = 123; // Mock contractId
// //
// //     fixture.detectChanges(); // Trigger ngOnInit
// //
// //     expect(component.loading).toBeFalse();
// //     expect(component.error).toBeFalse();
// //     expect(component.roomTypesDetails).toEqual(mockRoomTypes);
// //     expect(component.supplementsDetails).toEqual(mockSupplements);
// //   });
// //
// //   it('should handle error if room types fetch fails', () => {
// //     roomTypeServiceSpy.getRoomsByContractId.and.returnValue(of({ statusCode: 500, message: 'Internal Server Error' }));
// //
// //     component.contractId = 123; // Mock contractId
// //
// //     fixture.detectChanges(); // Trigger ngOnInit
// //
// //     expect(component.loading).toBeFalse();
// //     expect(component.error).toBeTrue();
// //   });
// //
// //   it('should handle error if supplements fetch fails', () => {
// //     supplementServiceSpy.getSupplementsByContractId.and.returnValue(of({ statusCode: 500, message: 'Internal Server Error' }));
// //
// //     component.contractId = 123; // Mock contractId
// //
// //     fixture.detectChanges(); // Trigger ngOnInit
// //
// //     expect(component.loading).toBeFalse();
// //     expect(component.error).toBeTrue();
// //   });
// });
