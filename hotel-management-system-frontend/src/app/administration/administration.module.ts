import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import {SharedModule} from "../shared/shared.module";
import { DashboardContextComponent } from './components/dashboard-context/dashboard-context.component';
import { AddHotelContextComponent } from './components/add-hotel-context/add-hotel-context.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddContractContextComponent } from './components/add-contract-context/add-contract-context.component';
import { ContractSeasonDetailsComponent } from './components/add-contract-context/inner-items/contract-season-details/contract-season-details.component';
import { SupplementDetailsComponent } from './components/add-contract-details-context/inner-items/supplement-details/supplement-details.component';
import { MarkupDetailsComponent } from './components/add-contract-details-context/inner-items/markup-details/markup-details.component';
import { DiscountDetailsComponent } from './components/add-contract-details-context/inner-items/discount-details/discount-details.component';
import { RoomtypesDetailsComponent } from './components/add-contract-details-context/inner-items/roomtypes-details/roomtypes-details.component';
import { AddContractDetailsContextComponent } from './components/add-contract-details-context/add-contract-details-context.component';
import { FindHotelContextComponent } from './components/find-hotel-context/find-hotel-context.component';
import { ResultsComponent } from './components/find-hotel-context/inner-items/results/results.component';
import { AdminHotelDetailsComponent } from './components/admin-hotel-details/admin-hotel-details.component';
import { HotelDetailsComponent } from './components/admin-hotel-details/inner-items/hotel-details/hotel-details.component';
import { HotelContractsComponent } from './components/admin-hotel-details/inner-items/hotel-contracts/hotel-contracts.component';
import { UpdateHotelContextComponent } from './components/update-hotel-context/update-hotel-context.component';
import { UpdateContractContextComponent } from './components/update-contract-context/update-contract-context.component';
import { MarkupUpdateComponent } from './components/update-contract-context/inner-items/markup-update/markup-update.component';
import { DiscountUpdateComponent } from './components/update-contract-context/inner-items/discount-update/discount-update.component';
import { SupplementsUpdateComponent } from './components/update-contract-context/inner-items/supplements-update/supplements-update.component';
import { RoomTypeUpdateComponent } from './components/update-contract-context/inner-items/room-type-update/room-type-update.component';
import { ViewContractContextComponent } from './components/view-contract-context/view-contract-context.component';
import { ViewContractDetailsComponent } from './components/view-contract-context/inner-items/view-contract-details/view-contract-details.component';
import { ViewSeasonDetailsComponent } from './components/view-contract-context/inner-items/view-season-details/view-season-details.component';
import { ViewDiscountDetailsComponent } from './components/view-contract-context/inner-items/view-discount-details/view-discount-details.component';
import { ViewMarkupDetailsComponent } from './components/view-contract-context/inner-items/view-markup-details/view-markup-details.component';
import { ViewSupplementsDetailsComponent } from './components/view-contract-context/inner-items/view-supplements-details/view-supplements-details.component';
import { ViewRoomtypesDetailsComponent } from './components/view-contract-context/inner-items/view-roomtypes-details/view-roomtypes-details.component';
import { ContractUpdateComponent } from './components/update-contract-context/inner-items/contract-update/contract-update.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AdminSearchComponent} from "./shared/components/admin-search/admin-search.component";
import {MainAdminSidebarComponent} from "./shared/components/main-admin-sidebar/main-admin-sidebar.component";
import {
  MainHeaderNavbarAdminComponent
} from "./shared/components/main-header-navbar-admin/main-header-navbar-admin.component";


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
    ResultsComponent,
    AdminHotelDetailsComponent,
    HotelDetailsComponent,
    HotelContractsComponent,
    UpdateHotelContextComponent,
    UpdateContractContextComponent,
    MarkupUpdateComponent,
    DiscountUpdateComponent,
    SupplementsUpdateComponent,
    RoomTypeUpdateComponent,
    ViewContractContextComponent,
    ViewContractDetailsComponent,
    ViewSeasonDetailsComponent,
    ViewDiscountDetailsComponent,
    ViewMarkupDetailsComponent,
    ViewSupplementsDetailsComponent,
    ViewRoomtypesDetailsComponent,
    ContractUpdateComponent,
    AdminSearchComponent,
    MainAdminSidebarComponent,
    MainHeaderNavbarAdminComponent
  ],
    imports: [
        CommonModule,
        AdministrationRoutingModule,
        SharedModule,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
    ]
})
export class AdministrationModule { }
