import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { MainHeaderNavbarComponent } from './components/main-header-navbar/main-header-navbar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainSearchbarComponent } from './components/main-searchbar/main-searchbar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PaymentPortalComponent } from './components/payment-portal/payment-portal.component';
import { BookingConfirmationCardComponent } from './components/booking-confirmation-card/booking-confirmation-card.component';
import { BookedRoomCardComponent } from './components/booked-room-card/booked-room-card.component';
import { BookedBillCardComponent } from './components/booked-bill-card/booked-bill-card.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MainButtonComponent } from './components/main-button/main-button.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { ConfirmationDialogComponentComponent } from './components/confirmation-dialog-component/confirmation-dialog-component.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { MainHeaderNavbarAdminComponent } from './components/main-header-navbar-admin/main-header-navbar-admin.component';
import { MainAdminSidebarComponent } from './components/main-admin-sidebar/main-admin-sidebar.component';
import { MainSmallButtonComponent } from './components/main-small-button/main-small-button.component';
import { PopUpCarouselComponent } from './components/pop-up-carousel/pop-up-carousel.component';
import { PopUpAvailabilityFormComponent } from './components/pop-up-availability-form/pop-up-availability-form.component';


@NgModule({
  declarations: [
    SharedComponent,
    MainHeaderNavbarComponent,
    MainFooterComponent,
    MainSearchbarComponent,
    PaymentPortalComponent,
    BookingConfirmationCardComponent,
    BookedRoomCardComponent,
    BookedBillCardComponent,
    RoomCardComponent,
    LoadingSpinnerComponent,
    MainButtonComponent,
    InternalServerErrorComponent,
    ConfirmationDialogComponentComponent,
    MainHeaderNavbarAdminComponent,
    MainAdminSidebarComponent,
    MainSmallButtonComponent,
    PopUpCarouselComponent,
    PopUpAvailabilityFormComponent,
  ],
  exports: [
    MainHeaderNavbarComponent,
    MainFooterComponent,
    MainSearchbarComponent,
    RoomCardComponent,
    LoadingSpinnerComponent,
    MainButtonComponent,
    InternalServerErrorComponent,
    BookingConfirmationCardComponent,
    MainHeaderNavbarAdminComponent,
    MainAdminSidebarComponent,
    MainSmallButtonComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule { }
