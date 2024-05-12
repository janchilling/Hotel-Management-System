import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DiscountServicesService } from './discount-services.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('DiscountServicesService', () => {
  let service: DiscountServicesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiscountServicesService]
    });
    service = TestBed.inject(DiscountServicesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error when adding discount fails', () => {
    const contractId = 123;
    const errorResponse = 'Error adding discount';

    service.addDiscount({}).subscribe(
      () => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Not Found');
        expect(error.error).toEqual(errorResponse);
      }
    );

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/discounts`);
    req.flush(errorResponse, { status: 404, statusText: 'Not Found' });
  });

  it('should handle error when fetching discounts fails', () => {
    const contractId = 123;
    const errorResponse = 'Error fetching discounts';

    service.getDiscounts(contractId).subscribe(
      () => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Not Found');
        expect(error.error).toEqual(errorResponse);
      }
    );

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/discounts`);
    req.flush(errorResponse, { status: 404, statusText: 'Not Found' });
  });
});
