import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarkupServicesService {

  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;

  addMarkup(markup: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/markups`, markup)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding Markups:', error);
          return of(null);
        })
      );
  }

  getMarkupsByContractId(contractId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/contracts/${contractId}/markups`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching markups:', error);
          return of(null);
        })
      );
  }
}
