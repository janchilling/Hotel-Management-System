import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  AuthenticationServicesService
} from "../../../../security/services/authenticationServices/authentication-services.service";

@Component({
  selector: 'app-main-header-navbar-admin',
  templateUrl: './main-header-navbar-admin.component.html',
  styleUrls: ['./main-header-navbar-admin.component.scss']
})
export class MainHeaderNavbarAdminComponent implements OnInit {

  userId: any | null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationServicesService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authenticationService.getUserId();
  }

  handleLogout(): void {
    this.authenticationService.logout();
  }

}
