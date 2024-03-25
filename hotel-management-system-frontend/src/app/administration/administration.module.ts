import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import {SharedModule} from "../shared/shared.module";
import { DashboardContextComponent } from './dashboard-context/dashboard-context.component';
import { AddHotelContextComponent } from './add-hotel-context/add-hotel-context.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdministrationComponent,
    DashboardContextComponent,
    AddHotelContextComponent
  ],
    imports: [
        CommonModule,
        AdministrationRoutingModule,
        SharedModule,
        NgOptimizedImage,
        FormsModule
    ]
})
export class AdministrationModule { }
