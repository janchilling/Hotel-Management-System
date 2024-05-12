import { TestBed } from '@angular/core/testing';
import { SearchParamsService } from './search-params.service';

describe('SearchParamsService', () => {
  let service: SearchParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchParamsService]
    });
    service = TestBed.inject(SearchParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty search parameters', (done) => {
    service.searchParams$.subscribe(params => {
      expect(params).toEqual({});
      done();
    });
  });

  it('should update search parameters', (done) => {
    const params = { destination: 'New York', checkIn: '2024-05-12', checkOut: '2024-05-15' };

    service.updateSearchParams(params);

    service.searchParams$.subscribe(updatedParams => {
      expect(updatedParams).toEqual(params);
      done();
    });
  });

  it('should update search parameters multiple times', (done) => {
    const initialParams = { destination: 'New York', checkIn: '2024-05-12', checkOut: '2024-05-15' };
    const updatedParams = { destination: 'Los Angeles', checkIn: '2024-06-01', checkOut: '2024-06-05' };

    service.updateSearchParams(initialParams);
    service.updateSearchParams(updatedParams);

    service.searchParams$.subscribe(params => {
      expect(params).toEqual(updatedParams);
      done();
    });
  });
});
