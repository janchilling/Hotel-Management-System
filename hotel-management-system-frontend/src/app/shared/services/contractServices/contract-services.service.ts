import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContractServicesService {

  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;

  addContract(contract: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/contracts/`, contract)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding Contract:', error);
          return of(null);
        })
      );
  }

  getContractsByHotel(hotelId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/hotels/${hotelId}/contracts`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Contracts:', error);
          return of(null);
        })
      );
  }

  updateContract(contractId: number, contract: any): Observable<any> {
    return this.httpClient.put<any>(`${this.backendHostName}/v1/contracts/${contractId}`, contract)
      .pipe(
        catchError((error: any) => {
          console.error('Error Updating Contract:', error);
          return of(null);
        })
      );
  }

  getContractsById(contractId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/contracts/${contractId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Contract:', error);
          return of(null);
        })
      );
  }
}
