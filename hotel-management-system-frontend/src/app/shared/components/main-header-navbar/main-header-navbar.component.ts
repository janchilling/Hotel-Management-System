import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {
  AuthenticationServicesService
} from "../../../security/services/authenticationServices/authentication-services.service";

@Component({
  selector: 'app-main-header-navbar',
  templateUrl: './main-header-navbar.component.html',
  styleUrls: ['./main-header-navbar.component.scss']
})
export class MainHeaderNavbarComponent {

  userDropdownOpen: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationServicesService
  ) {
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  toggleUserDropdown(): void {
    console.log("Clicked")
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  navigateToHome(){
    this.router.navigate(['main/home']);
  }

  navigateToCustomerBookings(){
    this.router.navigate(['main/myBookings']);
  }

  navigateToLogin(){
    this.router.navigate(['auth/login']);
  }

  navigateToSignup(){
    this.router.navigate(['auth/signup']);
  }

}
