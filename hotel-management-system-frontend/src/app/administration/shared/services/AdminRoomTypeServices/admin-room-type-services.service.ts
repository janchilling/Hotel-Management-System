import { Injectable } from '@angular/core';
import {ApiPathService} from "../../../../shared/services/apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminRoomTypeServicesService {

  constructor(
    private apiPathService: ApiPathService,
    private httpClient: HttpClient
  ) { }

  backendHostName: string = this.apiPathService.baseURL;

  // addSupplement(supplement: any): Observable<any> {
  //   return this.httpClient.post<any>(`${this.backendHostName}/v1/supplements`, supplement)
  //     .pipe(
  //       catchError((error: any) => {
  //         console.error('Error adding Supplement:', error);
  //         return of(null);
  //       })
  //     );
  // }

  updateRoomTypes(roomTypes: any[]): Observable<any> {
    return this.httpClient.put<any>(`${this.backendHostName}/v1/roomTypes/batch`, roomTypes)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating RoomTypes:', error);
          return throwError(() => error)
        })
      );
  }

  deleteRoomTypeById(roomTypeId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.backendHostName}/v1/roomTypes/${roomTypeId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting Room Type:', error);
          return throwError(() => error)
        })
      );
  }
}
