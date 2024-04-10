import { TestBed } from '@angular/core/testing';

import { RoomTypeServicesService } from './room-type-services.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('RoomTypeServicesService', () => {
  let service: RoomTypeServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomTypeServicesService]
    });
    service = TestBed.inject(RoomTypeServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch rooms by contract ID successfully', () => {
    const mockContractId = 123;
    service.getRoomsByContractId(mockContractId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${mockContractId}/roomTypes/`);
    expect(req.request.method).toBe('GET');
    req.flush([{ /* Mock room data */ }]);
  });

  it('should add room type successfully', () => {
    const mockRoomType = { /* Mock room type object */ };
    service.addRoomType(mockRoomType).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/roomTypes/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRoomType);
  });

  it('should fetch available number of rooms successfully', () => {
    const mockRoomTypeId = 456;
    const mockCheckInDate = new Date();
    const mockCheckOutDate = new Date();
    const mockSeasonId = 789;
    service.availableNoOfRooms(mockRoomTypeId, mockCheckInDate, mockCheckOutDate, mockSeasonId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const formattedCheckInDate = service.formatDateForSQL(mockCheckInDate);
    const formattedCheckOutDate = service.formatDateForSQL(mockCheckOutDate);
    const expectedUrl = `${service.backendHostName}/v1/roomTypes/${mockRoomTypeId}/availableNoOfRooms/${formattedCheckInDate}/${formattedCheckOutDate}/${mockSeasonId}`;

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush([{ /* Mock available rooms data */ }]);
  });

  it('should fail to fetch rooms by contract ID', () => {
    const mockContractId = 123;
    service.getRoomsByContractId(mockContractId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${mockContractId}/roomTypes/`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'));
  });

  it('should fail to add room type', () => {
    const mockRoomType = { /* Mock room type object */ };
    service.addRoomType(mockRoomType).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/roomTypes/`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Internal Server Error'));
  });

  it('should fail to fetch available number of rooms', () => {
    const mockRoomTypeId = 456;
    const mockCheckInDate = new Date();
    const mockCheckOutDate = new Date();
    const mockSeasonId = 789;
    service.availableNoOfRooms(mockRoomTypeId, mockCheckInDate, mockCheckOutDate, mockSeasonId).subscribe(response => {
      expect(response).toBeNull();
    });

    const formattedCheckInDate = service.formatDateForSQL(mockCheckInDate);
    const formattedCheckOutDate = service.formatDateForSQL(mockCheckOutDate);
    const expectedUrl = `${service.backendHostName}/v1/roomTypes/${mockRoomTypeId}/availableNoOfRooms/${formattedCheckInDate}/${formattedCheckOutDate}/${mockSeasonId}`;

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'));
  });
});
