import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SupplementServicesService {
  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;
  getSupplementsByContractId(contractId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/contracts/${contractId}/supplements/`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching supplements:', error);
          return of(null);
        })
      );
  }

  addSupplement(supplement: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/supplements/`, supplement)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding Supplement:', error);
          return of(null);
        })
      );
  }
}
