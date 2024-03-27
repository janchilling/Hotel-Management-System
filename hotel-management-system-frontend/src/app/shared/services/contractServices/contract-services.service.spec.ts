import { TestBed } from '@angular/core/testing';

import { ContractServicesService } from './contract-services.service';

describe('ContractServicesService', () => {
  let service: ContractServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
