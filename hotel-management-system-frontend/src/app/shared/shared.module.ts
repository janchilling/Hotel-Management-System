import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { MainHeaderNavbarComponent } from './components/main-header-navbar/main-header-navbar.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MainButtonComponent } from './components/main-button/main-button.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { ConfirmationDialogComponentComponent } from './components/confirmation-dialog-component/confirmation-dialog-component.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { MainSmallButtonComponent } from './components/main-small-button/main-small-button.component';
import { PopUpCarouselComponent } from './components/pop-up-carousel/pop-up-carousel.component';
import { PopUpAvailabilityFormComponent } from './components/pop-up-availability-form/pop-up-availability-form.component';
import {MainFooterComponent} from "./components/main-footer/main-footer.component";
import { HotelImagesCarouselComponent } from './components/hotel-images-carousel/hotel-images-carousel.component';


@NgModule({
  declarations: [
    SharedComponent,
    MainHeaderNavbarComponent,
    LoadingSpinnerComponent,
    MainButtonComponent,
    InternalServerErrorComponent,
    ConfirmationDialogComponentComponent,
    MainSmallButtonComponent,
    PopUpCarouselComponent,
    PopUpAvailabilityFormComponent,
    MainFooterComponent,
    HotelImagesCarouselComponent
  ],
  exports: [
    MainHeaderNavbarComponent,
    LoadingSpinnerComponent,
    MainButtonComponent,
    InternalServerErrorComponent,
    MainSmallButtonComponent,
    MainFooterComponent,
    HotelImagesCarouselComponent
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
