import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {User} from "../../../shared/interfaces/user";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiPathService} from "../../../shared/services/apiPath/api-path.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServicesService {

  public user: Observable<User | null>;
  backendHostName: string = this.apiPathService.baseURL;
  redirectUrl: any;
  private userSubject: BehaviorSubject<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiPathService: ApiPathService,
    public jwtHelper: JwtHelperService
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.backendHostName}/v1/auth/login`, { email, password })
      .pipe( tap(response => {
          if (response && response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            const decodedToken = this.jwtHelper.decodeToken(response.data.token);
            localStorage.setItem('userRole', decodedToken.role || '');
            localStorage.setItem('userId', decodedToken.userId || '');
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.userSubject.next(null);
    this.router.navigate(['/auth/login']);
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

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getUserId(): any | null {
    return localStorage.getItem('userId');
  }

}
