// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { RoomCardComponent } from './room-card.component';
// import {ActivatedRoute} from "@angular/router";
// import {of} from "rxjs";
// import {MatSnackBar} from "@angular/material/snack-bar";
// import {DateServiceService} from "../../../../../shared/services/dateService/date-service.service";
// import {RoomTypeServicesService} from "../../../../../shared/services/roomTypesServices/room-type-services.service";
//
// describe('RoomCardComponent', () => {
//   let component: RoomCardComponent;
//   let fixture: ComponentFixture<RoomCardComponent>;
//   let mockActivatedRoute: Partial<ActivatedRoute>;
//
//   beforeEach(async () => {
//     mockActivatedRoute = {
//       queryParams: of({
//         checkIn: '2024-04-01',
//         checkOut: '2024-04-05'
//       })
//     };
//
//     await TestBed.configureTestingModule({
//       declarations: [RoomCardComponent],
//       providers: [
//         { provide: ActivatedRoute, useValue: mockActivatedRoute },
//         { provide: MatSnackBar, useValue: {} },
//         { provide: DateServiceService, useValue: {} },
//         { provide: RoomTypeServicesService, useValue: {} }
//       ]
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(RoomCardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });
// });
