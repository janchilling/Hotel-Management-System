import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  AuthenticationServicesService
} from "../../../security/services/authenticationServices/authentication-services.service";

@Component({
  selector: 'app-main-header-navbar',
  templateUrl: './main-header-navbar.component.html',
  styleUrls: ['./main-header-navbar.component.scss']
})
export class MainHeaderNavbarComponent implements OnInit{

  userDropdownOpen: boolean = false;
  userId: any | null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationServicesService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authenticationService.getUserId();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  toggleUserDropdown(): void {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  navigateToHome(){
    this.router.navigate(['main/home']);
  }

  navigateToCustomerBookings(){
    this.router.navigate(['main/myBookings/', this.userId]);
  }

  navigateToLogin(){
    this.router.navigate(['auth/login']);
  }

  navigateToSignup(){
    this.router.navigate(['auth/signup']);
  }

  handleLogout(): void {
    this.authenticationService.logout();
  }

}
