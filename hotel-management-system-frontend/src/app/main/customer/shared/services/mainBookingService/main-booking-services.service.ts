import { Injectable } from '@angular/core';
import {ApiPathService} from "../../../../../shared/services/apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainBookingServicesService {

  constructor(
    private apiPathService: ApiPathService,
    private httpClient: HttpClient
  ) { }

  backendHostName: string = this.apiPathService.baseURL;

  addBooking(booking: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/bookings`, booking)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding Booking:', error);
          return of(null);
        })
      );
  }

  getBookingsByCustomer(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/customers/${userId}/bookings`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Bookings:', error);
          return of(null);
        })
      );
  }

  getBookingsByBookingId(bookingId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/bookings/${bookingId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Booking:', error);
          return of(null);
        })
      );
  }

  checkUserHasBooking(userId: number, checkInDate: String, checkOutDate: String): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/customers/${userId}/availability?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Bookings:', error);
          return of(null);
        })
      );
  }
}
