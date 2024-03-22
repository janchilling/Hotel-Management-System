import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiPathService {

  constructor() {
  }

  public baseURL = "http://localhost:8080";

}
