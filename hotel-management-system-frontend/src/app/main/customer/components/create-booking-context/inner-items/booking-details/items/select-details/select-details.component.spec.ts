import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDetailsComponent } from './select-details.component';
import {
  RoomTypeServicesService
} from "../../../../../../../shared/services/roomTypesServices/room-type-services.service";
import {
  SupplementServicesService
} from "../../../../../../../shared/services/supplementServices/supplement-services.service";
import {DiscountServicesService} from "../../../../../../../shared/services/discountServices/discount-services.service";
import {ActivatedRoute} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";
import {SharedModule} from "../../../../../../../shared/shared.module";

describe('SelectDetailsComponent', () => {
  let component: SelectDetailsComponent;
  let fixture: ComponentFixture<SelectDetailsComponent>;
  let roomTypeService: jasmine.SpyObj<RoomTypeServicesService>;
  let supplementService: jasmine.SpyObj<SupplementServicesService>;
  let discountService: jasmine.SpyObj<DiscountServicesService>;

  beforeEach(() => {
    const roomTypeSpy = jasmine.createSpyObj('RoomTypeServicesService', ['getRoomsByContractId']);
    const supplementSpy = jasmine.createSpyObj('SupplementServicesService', ['getSupplementsByContractId']);
    const discountSpy = jasmine.createSpyObj('DiscountServicesService', ['getDiscounts']);

    TestBed.configureTestingModule({
      declarations: [SelectDetailsComponent],
      providers: [
        { provide: RoomTypeServicesService, useValue: roomTypeSpy },
        { provide: SupplementServicesService, useValue: supplementSpy },
        { provide: DiscountServicesService, useValue: discountSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ checkIn: '2024-04-10', checkOut: '2024-04-15' }),
          },
        },
      ],
      imports: [ReactiveFormsModule, FormsModule, SharedModule],
    }).compileComponents();

    roomTypeService = TestBed.inject(RoomTypeServicesService) as jasmine.SpyObj<RoomTypeServicesService>;
    supplementService = TestBed.inject(SupplementServicesService) as jasmine.SpyObj<SupplementServicesService>;
    discountService = TestBed.inject(DiscountServicesService) as jasmine.SpyObj<DiscountServicesService>;

    fixture = TestBed.createComponent(SelectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch room types, supplements, and discounts on initialization', () => {
    const contractId = 123;

    roomTypeService.getRoomsByContractId.and.returnValue(of({ data: ['Room1', 'Room2'] }));
    supplementService.getSupplementsByContractId.and.returnValue(of({ data: ['Supplement1', 'Supplement2'] }));
    discountService.getDiscounts.and.returnValue(of({ data: ['Discount1', 'Discount2'] }));

    component.contractId = contractId;
    component.ngOnInit();

    expect(roomTypeService.getRoomsByContractId).toHaveBeenCalledWith(contractId);
    expect(supplementService.getSupplementsByContractId).toHaveBeenCalledWith(contractId);
    expect(discountService.getDiscounts).toHaveBeenCalledWith(contractId);

    expect(component.roomTypesDetails).toEqual(['Room1', 'Room2']);
    expect(component.supplementsDetails).toEqual(['Supplement1', 'Supplement2']);
    expect(component.discountDetails).toEqual(['Discount1', 'Discount2']);
    expect(component.isLoading).toBeFalse();
  });

  it('should emit selected room data when room selection changes', () => {
    const selectedRoomData = {
      bookingRooms: [{ roomTypeId: 1, noOfRooms: 2 }],
      bookingSupplements: [],
      discount: null, // Ensure discount is explicitly set to null
    };

    spyOn(component.selectDetailsChanged, 'emit');

    component.receiveRoomSelection(selectedRoomData);

    // Adjust the expectation to match the exact object with the 'discount' property set to null
    expect(component.selectedRoomData).toEqual(selectedRoomData);

    // Update the expected emit call to include the 'discount' property explicitly set to null
    expect(component.selectDetailsChanged.emit).toHaveBeenCalledWith({
      bookingRooms: [{ roomTypeId: 1, noOfRooms: 2 }],
      bookingSupplements: [],
      discount: null, // Ensure the 'discount' property is expected to be null
    });
  });


  it('should apply discount when valid discount code is entered', () => {
    const event = { target: { value: 'DISCOUNT123' } };
    const discountDetails = [
      { discountCode: 'DISCOUNT123', discountId: 1, seasonDiscounts: [{ startDate: '2024-04-01', endDate: '2024-05-01', discountPercentage: 10 }] },
    ];

    component.discountDetails = discountDetails;

    component.applyDiscount(event);

    expect(component.selectedRoomData.discount).toEqual({
      discountCode: 'DISCOUNT123',
      discountId: 1,
      discountPercentage: 10,
    });
    expect(component.invalidDiscountCode).toBeFalse();
  });

  it('should handle invalid discount code', () => {
    const event = { target: { value: 'INVALID123' } };
    const discountDetails = [
      { discountCode: 'DISCOUNT123', discountId: 1, seasonDiscounts: [{ startDate: '2024-04-01', endDate: '2024-05-01', discountPercentage: 10 }] },
    ];

    component.discountDetails = discountDetails;

    component.applyDiscount(event);

    expect(component.selectedRoomData.discount).toBeNull();
    expect(component.invalidDiscountCode).toBeTrue();
  });
});
