import { TestBed } from '@angular/core/testing';
import { ApiPathService } from './api-path.service';

describe('ApiPathService', () => {
  let service: ApiPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiPathService]
    });
    service = TestBed.inject(ApiPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a base URL property', () => {
    expect(service.baseURL).toBeDefined();
    expect(typeof service.baseURL).toBe('string');
  });

  it('should have the correct base URL', () => {
    expect(service.baseURL).toBe('http://localhost:8080/api');
  });
});
