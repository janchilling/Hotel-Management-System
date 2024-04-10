import { TestBed } from '@angular/core/testing';

import { SeasonServicesService } from './season-services.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ApiPathService} from "../apiPath/api-path.service";

describe('SeasonServicesService', () => {
  let service: SeasonServicesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeasonServicesService, ApiPathService]
    });
    service = TestBed.inject(SeasonServicesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch seasons by contractId successfully', () => {
    const contractId = 123;
    const mockSeasons = [{ id: 1, name: 'Summer' }, { id: 2, name: 'Winter' }];

    service.getSeasonsByContractId(contractId).subscribe(seasons => {
      expect(seasons).toEqual(mockSeasons);
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/seasons`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockSeasons);
  });

  it('should handle HTTP error gracefully', () => {
    const contractId = 456;

    service.getSeasonsByContractId(contractId).subscribe(seasons => {
      expect(seasons).toBeNull(); // Expect null when there's an error
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/seasons`);
    expect(req.request.method).toEqual('GET');

    const mockErrorResponse = { status: 404, statusText: 'Not Found' };
    req.flush('Error fetching seasons', mockErrorResponse);
  });

  it('should log error message when HTTP request fails', () => {
    const contractId = 789;
    spyOn(console, 'error'); // Spy on console.error to check if it's called

    service.getSeasonsByContractId(contractId).subscribe();

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/seasons`);
    expect(req.request.method).toEqual('GET');

    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };
    req.flush('Server error occurred', mockErrorResponse);

    // Expect console.error to be called with the error message
    expect(console.error).toHaveBeenCalledWith('Error fetching Seasons:', 'Server error occurred');
  });
});
