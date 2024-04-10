import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DiscountServicesService {

  constructor(private apiPathService: ApiPathService, public httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;

  addDiscount(discount: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/discounts/`, discount)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding Discount:', error);
          return of(null);
        })
      );
  }

  getDiscounts(contractId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/contracts/${contractId}/discounts/`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching discounts:', error);
          return of(null);
        })
      );
  }
}
