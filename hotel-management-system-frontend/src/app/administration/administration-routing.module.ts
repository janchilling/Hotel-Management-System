import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import {DashboardContextComponent} from "./dashboard-context/dashboard-context.component";
import {AddHotelContextComponent} from "./add-hotel-context/add-hotel-context.component";
import {AddContractContextComponent} from "./add-contract-context/add-contract-context.component";
import {
  AddContractDetailsContextComponent
} from "./add-contract-details-context/add-contract-details-context.component";
import {
  MarkupDetailsComponent
} from "./add-contract-details-context/inner-items/markup-details/markup-details.component";
import {
  DiscountDetailsComponent
} from "./add-contract-details-context/inner-items/discount-details/discount-details.component";
import {
  SupplementDetailsComponent
} from "./add-contract-details-context/inner-items/supplement-details/supplement-details.component";
import {
  RoomtypesDetailsComponent
} from "./add-contract-details-context/inner-items/roomtypes-details/roomtypes-details.component";
import {FindHotelContextComponent} from "./find-hotel-context/find-hotel-context.component";
import {HotelDetailsComponent} from "./admin-hotel-details/inner-items/hotel-details/hotel-details.component";
import {AdminHotelDetailsComponent} from "./admin-hotel-details/admin-hotel-details.component";
import {ViewContractDetailsComponent} from "./view-contract-details/view-contract-details.component";
import {UpdateHotelContextComponent} from "./update-hotel-context/update-hotel-context.component";

const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardContextComponent },
    { path: 'addHotel', component: AddHotelContextComponent },
    { path: 'findHotel', component: FindHotelContextComponent },
    { path: 'hotel/:hotelId', component: AdminHotelDetailsComponent },
    { path: 'updateHotel/:hotelId', component: UpdateHotelContextComponent },
    { path: 'addContract/:hotelId', component: AddContractContextComponent },
    { path: 'addContractDetails', component: AddContractDetailsContextComponent },
    { path: 'contracts/:contractId', component: ViewContractDetailsComponent },
    { path: 'addMarkup', component: MarkupDetailsComponent },
    { path: 'addDiscount', component: DiscountDetailsComponent },
    { path: 'addSupplement', component: SupplementDetailsComponent },
    { path: 'addRoomType', component: RoomtypesDetailsComponent },
  ],
},];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
