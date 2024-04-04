import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HotelServicesService {

  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;

  addHotel(hotel: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/hotels/`, hotel)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding hotel:', error);
          return of(null);
        })
      );
  }

  getHotelImages(hotelId: any): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/hotels/${hotelId}/images`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching hotel images:', error);
          return of(null);
        })
      );
  }
}
