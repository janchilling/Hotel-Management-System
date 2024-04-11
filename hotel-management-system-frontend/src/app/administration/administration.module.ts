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
import { SupplementDetailsComponent } from './add-contract-details-context/inner-items/supplement-details/supplement-details.component';;
import { MarkupDetailsComponent } from './add-contract-details-context/inner-items/markup-details/markup-details.component';
import { DiscountDetailsComponent } from './add-contract-details-context/inner-items/discount-details/discount-details.component';
import { RoomtypesDetailsComponent } from './add-contract-details-context/inner-items/roomtypes-details/roomtypes-details.component';
import { AddContractDetailsContextComponent } from './add-contract-details-context/add-contract-details-context.component';
import { FindHotelContextComponent } from './find-hotel-context/find-hotel-context.component';
import { SearchComponent } from './find-hotel-context/inner-items/search/search.component';
import { ResultsComponent } from './find-hotel-context/inner-items/results/results.component';
import { AdminHotelDetailsComponent } from './admin-hotel-details/admin-hotel-details.component';
import { HotelDetailsComponent } from './admin-hotel-details/inner-items/hotel-details/hotel-details.component';
import { HotelContractsComponent } from './admin-hotel-details/inner-items/hotel-contracts/hotel-contracts.component';
import { ViewContractDetailsComponent } from './view-contract-details/view-contract-details.component';
import { UpdateHotelContextComponent } from './update-hotel-context/update-hotel-context.component';
import { UpdateContractContextComponent } from './update-contract-context/update-contract-context.component';
import { MarkupUpdateComponent } from './update-contract-context/inner-items/markup-update/markup-update.component';
import { DiscountUpdateComponent } from './update-contract-context/inner-items/discount-update/discount-update.component';
import { SupplementsUpdateComponent } from './update-contract-context/inner-items/supplements-update/supplements-update.component';
import { RoomTypeUpdateComponent } from './update-contract-context/inner-items/room-type-update/room-type-update.component';
import { ContractDetailsComponent } from './view-contract-details/inner-items/contract-details/contract-details.component';
import { SeasonDetailsComponent } from './view-contract-details/inner-items/season-details/season-details.component';
import { RoomtypeDetailsComponent } from './view-contract-details/inner-items/roomtype-details/roomtype-details.component';


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
    RoomtypesDetailsComponent,
    AddContractDetailsContextComponent,
    FindHotelContextComponent,
    SearchComponent,
    ResultsComponent,
    AdminHotelDetailsComponent,
    HotelDetailsComponent,
    HotelContractsComponent,
    ViewContractDetailsComponent,
    UpdateHotelContextComponent,
    UpdateContractContextComponent,
    MarkupUpdateComponent,
    DiscountUpdateComponent,
    SupplementsUpdateComponent,
    RoomTypeUpdateComponent,
    ContractDetailsComponent,
    SeasonDetailsComponent,
    RoomtypeDetailsComponent
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
