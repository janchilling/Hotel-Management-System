import { Injectable } from '@angular/core';
import {ApiPathService} from "../../../../shared/services/apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminMarkupServicesService {

  constructor(
    private apiPathService: ApiPathService,
    private httpClient: HttpClient
  ) { }

  backendHostName: string = this.apiPathService.baseURL;

  updateMarkup(markup: any): Observable<any> {
    return this.httpClient.put<any>(`${this.backendHostName}/v1/markups`, markup)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating Markups:', error);
          return throwError(() => error)
        })
      );
  }

  deleteMarkupById(markupId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.backendHostName}/v1/markups/${markupId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting Supplement:', error);
          return throwError(() => error)
        })
      );
  }
}
