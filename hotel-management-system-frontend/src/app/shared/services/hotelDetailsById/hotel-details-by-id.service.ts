import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HotelDetailsByIdService {

  constructor(private apiPathService: ApiPathService, private httpClient: HttpClient) {
  }

  backendHostName: String = this.apiPathService.baseURL;

  getHotelDetailsById(hotelId: number) {
    return this.httpClient.get(this.backendHostName + "/v1/products/" + hotelId);
  }

  getHotelDetailsByIdAdmin(hotelId: number) {
    return this.httpClient.get(this.backendHostName + "/v1/hotels/" + hotelId);
  }
}
