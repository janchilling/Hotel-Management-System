import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelServicesService } from './hotel-services.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { of } from 'rxjs';

describe('HotelServicesService', () => {
  let service: HotelServicesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let apiPathService: ApiPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HotelServicesService,
        ApiPathService,
        HttpClient,
        {
          provide: AngularFireStorage,
          useValue: jasmine.createSpyObj('AngularFireStorage', ['storage'])
        }
      ]
    });
    service = TestBed.inject(HotelServicesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    apiPathService = TestBed.inject(ApiPathService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add hotel successfully', () => {
    const dummyHotel = { name: 'Test Hotel', location: 'Test Location' };

    service.addHotel(dummyHotel).subscribe((response) => {
      expect(response).toBeDefined();
    });

    const req = httpTestingController.expectOne(`${apiPathService.baseURL}/v1/hotels`);
    expect(req.request.method).toEqual('POST');
    req.flush({});
  });

  it('should handle error when adding hotel fails', () => {
    const dummyHotel = { name: 'Test Hotel', location: 'Test Location' };
    const errorResponse = new HttpErrorResponse({
      error: 'Error adding hotel',
      status: 500,
      statusText: 'Internal Server Error'
    });

    service.addHotel(dummyHotel).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpTestingController.expectOne(`${apiPathService.baseURL}/v1/hotels`);
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });
});
