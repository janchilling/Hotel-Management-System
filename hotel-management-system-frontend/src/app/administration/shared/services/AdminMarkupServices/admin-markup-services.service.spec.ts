import { TestBed } from '@angular/core/testing';

import { AdminMarkupServicesService } from './admin-markup-services.service';

describe('AdminMarkupServicesService', () => {
  let service: AdminMarkupServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMarkupServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
