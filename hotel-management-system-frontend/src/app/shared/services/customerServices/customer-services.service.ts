import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerServicesService {

  constructor(private apiPathService: ApiPathService, public httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;

  getCustomerById(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/customers/${userId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Customer:', error);
          return of(null);
        })
      );
  }
}
