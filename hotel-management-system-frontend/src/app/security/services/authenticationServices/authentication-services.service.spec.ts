import { TestBed } from '@angular/core/testing';

import { AuthenticationServicesService } from './authentication-services.service';

describe('AuthenticationServicesService', () => {
  let service: AuthenticationServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
