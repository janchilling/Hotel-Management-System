import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import {SharedModule} from "../shared/shared.module";
import { DashboardContextComponent } from './dashboard-context/dashboard-context.component';
import { AddHotelContextComponent } from './add-hotel-context/add-hotel-context.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddContractContextComponent } from './add-contract-context/add-contract-context.component';
import { ContractSeasonDetailsComponent } from './add-contract-context/inner-items/contract-season-details/contract-season-details.component';
import { SupplementDetailsComponent } from './add-contract-context/inner-items/supplement-details/supplement-details.component';;
import { MarkupDetailsComponent } from './add-contract-context/inner-items/markup-details/markup-details.component';
import { DiscountDetailsComponent } from './add-contract-context/inner-items/discount-details/discount-details.component';
import { RoomtypesDetailsComponent } from './add-contract-context/inner-items/roomtypes-details/roomtypes-details.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    DashboardContextComponent,
    AddHotelContextComponent,
    AddContractContextComponent,
    ContractSeasonDetailsComponent,
    SupplementDetailsComponent,
    MarkupDetailsComponent,
    DiscountDetailsComponent,
    RoomtypesDetailsComponent
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
