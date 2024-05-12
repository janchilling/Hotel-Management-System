import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminDiscountServicesService } from './admin-discount-services.service';

describe('AdminDiscountServicesService', () => {
  let service: AdminDiscountServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AdminDiscountServicesService]
    });
    service = TestBed.inject(AdminDiscountServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
