import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthenticationServicesService} from "../authenticationServices/authentication-services.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(
    private router: Router,
    private authService: AuthenticationServicesService,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {

    const token = localStorage.getItem('token');

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      // this.authService.redirectUrl = url;
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    const expectedRole = localStorage.getItem('userRole');
    const tokenPayload = this.jwtHelper.decodeToken(token);

    if (!tokenPayload || tokenPayload.role !== expectedRole) {
      // this.authService.redirectUrl = url;
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    return true;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
