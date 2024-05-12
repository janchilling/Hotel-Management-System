import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminSupplementServicesService } from './admin-supplement-services.service';

describe('AdminSupplementServicesService', () => {
  let service: AdminSupplementServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AdminSupplementServicesService]
    });
    service = TestBed.inject(AdminSupplementServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
