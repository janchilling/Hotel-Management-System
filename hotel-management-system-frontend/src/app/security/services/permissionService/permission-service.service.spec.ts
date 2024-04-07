import { TestBed } from '@angular/core/testing';

import { PermissionServiceService } from './permission-service.service';

describe('PermissionServiceService', () => {
  let service: PermissionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
