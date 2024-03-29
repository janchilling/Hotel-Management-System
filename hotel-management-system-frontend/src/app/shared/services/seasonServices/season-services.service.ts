import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SeasonServicesService {

  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) { }

  backendHostName: string = this.apiPathService.baseURL;

  getSeasonsByContractId(contractId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/contracts/${contractId}/seasons`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching Seasons:', error);
          return of(null);
        })
      );
  }

}
