import { TestBed } from '@angular/core/testing';

import { MarkupServicesService } from './markup-services.service';

describe('MarkupServicesService', () => {
  let service: MarkupServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkupServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
