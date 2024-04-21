import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {PopUpAvailabilityFormComponent} from "../pop-up-availability-form/pop-up-availability-form.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdminSearchComponent} from "../admin-search/admin-search.component";

@Component({
  selector: 'app-main-admin-sidebar',
  templateUrl: './main-admin-sidebar.component.html',
  styleUrls: ['./main-admin-sidebar.component.scss']
})
export class MainAdminSidebarComponent {

  dialogRef: MatDialogRef<AdminSearchComponent> | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  handleDashboardClick(){
    this.router.navigate(['/administration/dashboard']);
  }

  handleAddHotelClick(){
    this.router.navigate(['/administration/addHotel'])
  }

  handleFindHotelClick(){
    this.dialogRef = this.dialog.open(AdminSearchComponent, {
      width: '40vw',
      height: '20vh',
      panelClass: 'pop-up-carousel-dialog'
    });

    this.dialogRef.componentInstance.searchSubmitted.subscribe(() => {
      this.closeDialog();
    });
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
