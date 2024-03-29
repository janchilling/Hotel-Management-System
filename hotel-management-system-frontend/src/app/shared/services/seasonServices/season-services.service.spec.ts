import { TestBed } from '@angular/core/testing';

import { SeasonServicesService } from './season-services.service';

describe('SeasonServicesService', () => {
  let service: SeasonServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
