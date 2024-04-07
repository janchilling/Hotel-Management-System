import { TestBed } from '@angular/core/testing';

import { JWTInterceptorService } from './jwt-interceptor.service';

describe('JWTInterceptorService', () => {
  let service: JWTInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
