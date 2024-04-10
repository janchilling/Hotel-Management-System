import { TestBed } from '@angular/core/testing';

import { SupplementServicesService } from './supplement-services.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ApiPathService} from "../apiPath/api-path.service";

describe('SupplementServicesService', () => {
  let service: SupplementServicesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplementServicesService, ApiPathService]
    });
    service = TestBed.inject(SupplementServicesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch supplements by contractId successfully', () => {
    const contractId = 123;
    const mockSupplements = [{ id: 1, name: 'Vitamin A' }, { id: 2, name: 'Protein Powder' }];

    service.getSupplementsByContractId(contractId).subscribe(supplements => {
      expect(supplements).toEqual(mockSupplements);
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/supplements/`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockSupplements);
  });

  it('should handle HTTP error when fetching supplements', () => {
    const contractId = 456;

    service.getSupplementsByContractId(contractId).subscribe(supplements => {
      expect(supplements).toBeNull(); // Expect null when there's an error
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/supplements/`);
    expect(req.request.method).toEqual('GET');

    const mockErrorResponse = { status: 404, statusText: 'Not Found' };
    req.flush('Supplements not found', mockErrorResponse);
  });

  it('should add supplement successfully', () => {
    const supplementToAdd = { name: 'Omega-3 Fish Oil', quantity: 1 };

    service.addSupplement(supplementToAdd).subscribe(response => {
      expect(response).toEqual({ success: true }); // Mock success response
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/supplements/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(supplementToAdd);

    req.flush({ success: true });
  });

  it('should handle HTTP error when adding supplement', () => {
    const supplementToAdd = { name: 'Multivitamin', quantity: 2 };

    service.addSupplement(supplementToAdd).subscribe(response => {
      expect(response).toBeNull(); // Expect null when there's an error
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/supplements/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(supplementToAdd);

    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };
    req.flush('Server error occurred', mockErrorResponse);
  });

  it('should log error message when HTTP request fails', () => {
    const contractId = 789;
    spyOn(console, 'error'); // Spy on console.error to check if it's called

    service.getSupplementsByContractId(contractId).subscribe();

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/supplements/`);
    expect(req.request.method).toEqual('GET');

    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };
    req.flush('Server error occurred', mockErrorResponse);

    // Expect console.error to be called with the error message
    expect(console.error).toHaveBeenCalledWith('Error fetching supplements:', 'Server error occurred');
  });
});
