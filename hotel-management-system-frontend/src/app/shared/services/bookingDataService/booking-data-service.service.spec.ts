import { TestBed } from '@angular/core/testing';
import { BookingDataServiceService } from './booking-data-service.service';

describe('BookingDataServiceService', () => {
  let service: BookingDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize selectedDetails as an empty object', () => {
    expect(service.selectedDetails).toEqual({});
  });

  it('should initialize contactDetails as an empty object', () => {
    expect(service.contactDetails).toEqual({});
  });
});
