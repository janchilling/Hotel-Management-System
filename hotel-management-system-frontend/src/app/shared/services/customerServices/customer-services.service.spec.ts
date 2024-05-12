import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerServicesService } from './customer-services.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('CustomerServicesService', () => {
  let service: CustomerServicesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiPathService, CustomerServicesService]
    });
    service = TestBed.inject(CustomerServicesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch customer by id', () => {
    const userId = 123;
    const mockCustomer = { id: userId, name: 'John Doe' };

    service.getCustomerById(userId).subscribe(customer => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/customers/${userId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockCustomer);
  });

  it('should handle error when fetching customer fails', () => {
    const userId = 123;
    const errorMessage = 'Error fetching customer';
    spyOn(console, 'error');

    service.getCustomerById(userId).subscribe(customer => {
      expect(customer).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Error fetching Customer:', jasmine.any(HttpErrorResponse));
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/customers/${userId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

});
