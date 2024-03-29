import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomTypeServicesService {
  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;

  getRoomsByContractId(contractId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/roomTypes/getRoomTypeByContract/${contractId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching rooms:', error);
          return of(null);
        })
      );
  }

  addRoomType(roomType: any): Observable<any> {
    console.log(roomType);
    return this.httpClient.post<any>(`${this.backendHostName}/v1/roomTypes/`, roomType)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding room type:', error);
          return of(null);
        })
      );
  }

  availableNoOfRooms(roomTypeId: number, checkInDate: Date, checkOutDate: Date, seasonId: number): Observable<any> {
    // Format dates in SQL format (YYYY-MM-DD)
    const formattedCheckInDate = this.formatDateForSQL(checkInDate);
    const formattedCheckOutDate = this.formatDateForSQL(checkOutDate);

    // Construct the URL with roomTypeId and formatted dates as path variables
    const url = `${this.backendHostName}/v1/roomTypes/${roomTypeId}/availableNoOfRooms/${formattedCheckInDate}/${formattedCheckOutDate}/${seasonId}`;

    return this.httpClient.get<any>(url)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching rooms:', error);
          return of(null);
        })
      );
  }

  private formatDateForSQL(date: Date): string {
    // Format date as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }
}
