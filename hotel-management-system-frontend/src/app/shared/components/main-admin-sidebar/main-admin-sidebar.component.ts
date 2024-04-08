import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-admin-sidebar',
  templateUrl: './main-admin-sidebar.component.html',
  styleUrls: ['./main-admin-sidebar.component.scss']
})
export class MainAdminSidebarComponent {

  constructor(
    private router: Router
  ) {
  }

  handleDashboardClick(){
    this.router.navigate(['/admindashboard/admindashboard']);
  }

  handleAddHotelClick(){
    this.router.navigate(['/administration/addHotel'])
  }

  handleFindHotelClick(){
    this.router.navigate(['/administration/findHotel'])
  }

}
