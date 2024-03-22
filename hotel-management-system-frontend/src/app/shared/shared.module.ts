import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { MainHeaderNavbarComponent } from './components/main-header-navbar/main-header-navbar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainSearchbarComponent } from './components/main-searchbar/main-searchbar.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SharedComponent,
    MainHeaderNavbarComponent,
    MainFooterComponent,
    MainSearchbarComponent
  ],
  exports: [
    MainHeaderNavbarComponent,
    MainFooterComponent,
    MainSearchbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
