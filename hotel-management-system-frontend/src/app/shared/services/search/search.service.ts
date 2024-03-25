import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) {
  }

  backendHostName: String = this.apiPathService.baseURL;

  getSearchData(destination: String, noOfRooms: String, checkIn: String, checkOut: String) {
    return this.httpClient.get(this.backendHostName + "/v1/products?destination=" + destination + "&noOfRooms=" + noOfRooms + "&checkIn=" + checkIn + "&checkOut=" + checkOut);
  }
}
