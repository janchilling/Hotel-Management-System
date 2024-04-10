import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPaymentComponent } from './booking-payment.component';
import {MarkupServicesService} from "../../../../../shared/services/markupServices/markup-services.service";
import {DateServiceService} from "../../../../../shared/services/dateService/date-service.service";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BookingPaymentComponent', () => {
  let component: BookingPaymentComponent;
  let fixture: ComponentFixture<BookingPaymentComponent>;
  let markupServiceSpy: jasmine.SpyObj<MarkupServicesService>;
  let dateServiceSpy: jasmine.SpyObj<DateServiceService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    markupServiceSpy = jasmine.createSpyObj('MarkupServicesService', ['getMarkupsByContractId']);
    dateServiceSpy = jasmine.createSpyObj('DateServiceService', ['formatDate']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [BookingPaymentComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MarkupServicesService, useValue: markupServiceSpy },
        { provide: DateServiceService, useValue: dateServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub}
      ]
    });

    activatedRouteStub = {
      queryParams: of({ checkIn: '2024-04-10', checkOut: '2024-05-10' }) // Provide necessary queryParams
    };

    fixture = TestBed.createComponent(BookingPaymentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isPrepaymentEligible to true if checkIn date is more than 3 days from today', () => {
    component.today = new Date('2024-04-07');
    component.checkInDate = '2024-04-15'; // Check-in date is more than 3 days from today

    component.checkPrepaymentEligibility();

    expect(component.isPrepaymentEligible).toBeTrue();
  });

  it('should set selectedPaymentOption to prepayment and return correct total for prepayment', () => {
    component.finalPrice = 600;

    component.selectedPaymentOption = 'prepayment';
    const prepaymentTotal = component.getTotal();

    expect(prepaymentTotal).toEqual(150); // 25% of final price for prepayment
  });

  it('should open confirmation dialog and call createBooking on confirmation', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.createBooking = jasmine.createSpy('createBooking');

    component.openConfirmationDialog();

    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.createBooking).toHaveBeenCalled();
  });
});
