import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {User} from "../../../shared/interfaces/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiPathService} from "../../../shared/services/apiPath/api-path.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServicesService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  backendHostName: string = this.apiPathService.baseURL;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiPathService: ApiPathService,
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.backendHostName}/v1/auth/login`, { email, password })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  signup(user: any) {
    return this.http.post<any>(`${this.backendHostName}/v1/auth/signup`, user)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding User:', error);
          return of(null);
        })
      );
  }
}
