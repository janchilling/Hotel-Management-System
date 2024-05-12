import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomTypeServicesService } from './room-type-services.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient } from '@angular/common/http';

describe('RoomTypeServicesService', () => {
  let service: RoomTypeServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomTypeServicesService, ApiPathService]
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

  it('should get rooms by contract ID successfully', () => {
    const contractId = 123;
    service.getRoomsByContractId(contractId).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/roomTypes`);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when getting rooms by contract ID', () => {
    const contractId = 123;
    service.getRoomsByContractId(contractId).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/roomTypes`);
    request.error(new ErrorEvent('error'));
  });

  it('should add room type successfully', () => {
    const mockRoomType = { /* mock room type object */ };
    service.addRoomType(mockRoomType).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/roomTypes`);
    expect(request.request.method).toBe('POST');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when adding room type', () => {
    const mockRoomType = { /* invalid/malformed room type object */ };
    service.addRoomType(mockRoomType).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/roomTypes`);
    request.error(new ErrorEvent('error'));
  });

  it('should fetch available number of rooms successfully', () => {
    const roomTypeId = 123;
    const checkInDate = new Date();
    const checkOutDate = new Date();
    const seasonId = 456;
    service.availableNoOfRooms(roomTypeId, checkInDate, checkOutDate, seasonId).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const expectedUrl = `${service.backendHostName}/v1/roomTypes/${roomTypeId}/availability?seasonId=${seasonId}&checkInDate=${service.formatDateForSQL(checkInDate)}&checkOutDate=${service.formatDateForSQL(checkOutDate)}`;
    const request = httpMock.expectOne(expectedUrl);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when fetching available number of rooms', () => {
    const roomTypeId = 123;
    const checkInDate = new Date();
    const checkOutDate = new Date();
    const seasonId = 456;
    service.availableNoOfRooms(roomTypeId, checkInDate, checkOutDate, seasonId).subscribe(response => {
      expect(response).toBeNull();
    });

    const expectedUrl = `${service.backendHostName}/v1/roomTypes/${roomTypeId}/availability?seasonId=${seasonId}&checkInDate=${service.formatDateForSQL(checkInDate)}&checkOutDate=${service.formatDateForSQL(checkOutDate)}`;
    const request = httpMock.expectOne(expectedUrl);
    request.error(new ErrorEvent('error'));
  });

  // Add more test cases as needed
});
