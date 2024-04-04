import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;

  addBooking(booking: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/bookings/`, booking)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding Booking:', error);
          return of(null);
        })
      );
  }
}
