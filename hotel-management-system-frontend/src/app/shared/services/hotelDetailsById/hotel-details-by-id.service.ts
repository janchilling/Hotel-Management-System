import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HotelDetailsByIdService {

  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) {
  }

  backendHostName: String = this.apiPathService.baseURL;

  getHotelDetailsByIdAdmin(hotelId: number) {
    return this.httpClient.get(this.backendHostName + "/v1/hotels/" + hotelId)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Hotel Details:', error);
          return throwError(() => error)
        })
      );
  }
}
