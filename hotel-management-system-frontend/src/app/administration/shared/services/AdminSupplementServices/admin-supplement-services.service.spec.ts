import { TestBed } from '@angular/core/testing';

import { AdminSupplementServicesService } from './admin-supplement-services.service';

describe('AdminSupplementServicesService', () => {
  let service: AdminSupplementServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSupplementServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
