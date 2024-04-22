import { Injectable } from '@angular/core';
import {ApiPathService} from "../../../../shared/services/apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminSupplementServicesService {

  constructor(
    private apiPathService: ApiPathService,
    private httpClient: HttpClient
  ) { }

  backendHostName: string = this.apiPathService.baseURL;

  addSupplement(supplement: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/supplements`, supplement)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding Supplement:', error);
          return of(null);
        })
      );
  }

  updateSupplements(supplements: any[]): Observable<any> {
    return this.httpClient.put<any>(`${this.backendHostName}/v1/supplements/batch`, supplements)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating Supplements:', error);
          return throwError(() => error)
        })
      );
  }

  deleteSupplementById(supplementId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.backendHostName}/v1/supplements/${supplementId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting Supplement:', error);
          return throwError(() => error)
        })
      );
  }
}
