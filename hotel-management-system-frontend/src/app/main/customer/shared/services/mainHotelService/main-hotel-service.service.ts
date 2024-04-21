import { Injectable } from '@angular/core';
import {ApiPathService} from "../../../../../shared/services/apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {StandardResponse} from "../../../../../shared/interfaces/standard-response";
import {HotelDetails} from "../../../../../shared/interfaces/hotel-details";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainHotelServiceService {

  constructor(
    private apiPathService: ApiPathService,
    private httpClient: HttpClient
  ) { }

  backendHostName: String = this.apiPathService.baseURL;

  getHotelDetailsById(hotelId: number) {
    return this.httpClient.get<StandardResponse<HotelDetails>>(`${this.backendHostName}/v1/products/${hotelId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Hotel Details:', error);
          return throwError(() => error)
        })
      );
  }
}
