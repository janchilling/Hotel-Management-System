import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {

    const token = localStorage.getItem('token');

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    const expectedRole = route.data['expectedRole'];
    console.log(expectedRole)
    const userRole = localStorage.getItem('userRole');

    if (!userRole || userRole !== expectedRole) {
      this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    return true;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}

