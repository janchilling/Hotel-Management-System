import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import {SharedModule} from "../shared/shared.module";
import { DashboardContextComponent } from './dashboard-context/dashboard-context.component';
import { AddHotelContextComponent } from './add-hotel-context/add-hotel-context.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddContractContextComponent } from './add-contract-context/add-contract-context.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    DashboardContextComponent,
    AddHotelContextComponent,
    AddContractContextComponent
  ],
    imports: [
        CommonModule,
        AdministrationRoutingModule,
        SharedModule,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AdministrationModule { }
