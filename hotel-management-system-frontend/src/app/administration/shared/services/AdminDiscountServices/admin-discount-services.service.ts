import { Injectable } from '@angular/core';
import {ApiPathService} from "../../../../shared/services/apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminDiscountServicesService {

  constructor(
    private apiPathService: ApiPathService,
    public httpClient: HttpClient
  ) { }

  backendHostName: string = this.apiPathService.baseURL;

  addDiscount(discount: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/discounts`, discount)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding Discount:', error);
          return throwError(() => error)
        })
      );
  }

  updateDiscounts(discounts: any[]): Observable<any> {
    return this.httpClient.put<any>(`${this.backendHostName}/v1/discounts/batch`, discounts)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating Discounts:', error);
          return throwError(() => error)
        })
      );
  }

  deleteDiscountById(discountId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.backendHostName}/v1/discounts/${discountId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting Discount:', error);
          return throwError(() => error)
        })
      );
  }
}
