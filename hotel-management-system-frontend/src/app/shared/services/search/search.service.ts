import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {HotelDetails} from "../../interfaces/hotel-details";
import {catchError, Observable, throwError} from "rxjs";
import {StandardResponse} from "../../interfaces/standard-response";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private apiPathService: ApiPathService,
    private httpClient: HttpClient
  ){ }

  backendHostName: String = this.apiPathService.baseURL;

  getSearchData(destination: string, noOfRooms: string, noOfPersons: string, checkIn: string, checkOut: string): Observable<StandardResponse<HotelDetails>> {
    return this.httpClient.get<StandardResponse<HotelDetails>>(`${this.backendHostName}/v1/products?destination=${destination}&noOfRooms=${noOfRooms}&noOfAdults=${noOfPersons}&checkIn=${checkIn}&checkOut=${checkOut}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Search Results:', error);
          return throwError(() => error)
        })
      );
  }

  adminSearchData(hotel: String) {
    return this.httpClient.get(this.backendHostName + "/v1/products/admin?hotel=" + hotel)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Search Results:', error);
          return throwError(() => error)
        })
      );
  }
}
