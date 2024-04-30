import { Injectable } from '@angular/core';
import {ApiPathService} from "../apiPath/api-path.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class HotelServicesService {

  constructor(
    private apiPathService: ApiPathService,
    private httpClient: HttpClient,
    private http: HttpClient,
    private angularFireStorage: AngularFireStorage
  ) { }

  backendHostName: string = this.apiPathService.baseURL;

  addHotel(hotel: any): Observable<any> {
    return this.httpClient.post<any>(`${this.backendHostName}/v1/hotels`, hotel)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding hotel:', error);
          return of(null);
        })
      );
  }

  updateHotel(hotelId: any, hotel: any): Observable<any> {
    return this.httpClient.put<any>(`${this.backendHostName}/v1/hotels/${hotelId}`, hotel)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating hotel:', error);
          return of(null);
        })
      );
  }


  getHotelImages(hotelId: any): Observable<any> {
    return this.httpClient.get<any>(`${this.backendHostName}/v1/hotels/${hotelId}/images`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching hotel images:', error);
          return of(null);
        })
      );
  }

  checkAvailabilityByHotel(hotelId: number, noOfRooms: number, noOfPersons: number, checkIn: String, checkOut: String): Observable<any> {
    return this.httpClient.get(`${this.backendHostName}/v1/products/${hotelId}/availability?noOfRooms=${noOfRooms}&noOfAdults=${noOfPersons}&checkIn=${checkIn}&checkOut=${checkOut}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching hotel availability:', error);
          return of(null);
        })
      );
  }

  deleteImageFromFirebase(imageUrl: string): Observable<any> {
    return new Observable(observer => {
      const storageRef = this.angularFireStorage.storage.ref().child(imageUrl);
      storageRef.delete()
        .then(() => {
          observer.next({ statusCode: 200 }); // Successful deletion
          observer.complete();
        })
        .catch(error => {
          observer.error(error); // Error occurred during deletion
        });
    });
  }



  deleteImageDatabase(hotelId: number, hotelImageId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.backendHostName}/v1/hotels/${hotelId}/images/${hotelImageId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting image from MySQL:', error);
          return of(null);
        })
      );
  }
}
