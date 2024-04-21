import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {HotelDetails} from "../../interfaces/hotel-details";
import {Observable} from "rxjs";
import {StandardResponse} from "../../interfaces/StandardResponse";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private apiPathService: ApiPathService,
    private httpClient: HttpClient
  ){ }

  backendHostName: String = this.apiPathService.baseURL;

  getSearchData(destination: string, noOfRooms: string, checkIn: string, checkOut: string): Observable<StandardResponse<HotelDetails>> {
    return this.httpClient.get<StandardResponse<HotelDetails>>(`${this.backendHostName}/v1/products?destination=${destination}&noOfRooms=${noOfRooms}&checkIn=${checkIn}&checkOut=${checkOut}`);
  }

  adminSearchData(hotel: String) {
    return this.httpClient.get(this.backendHostName + "/v1/products/admin?hotel=" + hotel);
  }
}
