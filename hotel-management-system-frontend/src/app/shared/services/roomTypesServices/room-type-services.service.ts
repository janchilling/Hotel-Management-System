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
}
