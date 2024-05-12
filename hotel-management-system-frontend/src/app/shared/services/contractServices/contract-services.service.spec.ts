import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContractServicesService } from './contract-services.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

describe('ContractServicesService', () => {
  let service: ContractServicesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiPathService, ContractServicesService]
    });
    service = TestBed.inject(ContractServicesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error when adding contract fails', () => {
    const contract = {
        "contractId": 1,
        "startDate": "2024-01-01",
        "endDate": "2024-12-31",
        "contractStatus": "Active",
        "cancellationDeadline": 7,
        "cancellationAmount": 50,
        "prepayment": 30,
        "balancePayment": 70,
        "hotelId": 123,
        "seasons": [
          {
            "seasonId": 1,
            "seasonName": "Summer",
            "startDate": "2024-06-01",
            "endDate": "2024-08-31",
            "contractId": 1
          },
          {
            "seasonId": 2,
            "seasonName": "Winter",
            "startDate": "2024-12-01",
            "endDate": "2025-02-28",
            "contractId": 1
          }
        ]
      }
    ;
    const errorMessage = 'Error adding contract';
    spyOn(console, 'error');

    service.addContract(contract).subscribe(response => {
      expect(response).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Error adding Contract:', jasmine.any(HttpErrorResponse));
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/contracts`);
    expect(req.request.method).toEqual('POST');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  // Similarly, write tests for other methods like getContractsByHotel, updateContract, getContractsById
});
