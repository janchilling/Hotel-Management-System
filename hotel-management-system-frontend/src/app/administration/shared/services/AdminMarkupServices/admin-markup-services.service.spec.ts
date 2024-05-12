import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminMarkupServicesService } from './admin-markup-services.service';

describe('AdminMarkupServicesService', () => {
  let service: AdminMarkupServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AdminMarkupServicesService]
    });
    service = TestBed.inject(AdminMarkupServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
