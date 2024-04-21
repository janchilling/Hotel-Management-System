import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministrationComponent} from './administration.component';
import {DashboardContextComponent} from "./components/dashboard-context/dashboard-context.component";
import {AddHotelContextComponent} from "./components/add-hotel-context/add-hotel-context.component";
import {AddContractContextComponent} from "./components/add-contract-context/add-contract-context.component";
import { AddContractDetailsContextComponent } from "./components/add-contract-details-context/add-contract-details-context.component";
import { MarkupDetailsComponent } from "./components/add-contract-details-context/inner-items/markup-details/markup-details.component";
import { DiscountDetailsComponent } from "./components/add-contract-details-context/inner-items/discount-details/discount-details.component";
import { SupplementDetailsComponent } from "./components/add-contract-details-context/inner-items/supplement-details/supplement-details.component";
import { RoomtypesDetailsComponent } from "./components/add-contract-details-context/inner-items/roomtypes-details/roomtypes-details.component";
import {FindHotelContextComponent} from "./components/find-hotel-context/find-hotel-context.component";
import {AdminHotelDetailsComponent} from "./components/admin-hotel-details/admin-hotel-details.component";
import {UpdateHotelContextComponent} from "./components/update-hotel-context/update-hotel-context.component";
import {ViewContractContextComponent} from "./components/view-contract-context/view-contract-context.component";
import {UpdateContractContextComponent} from "./components/update-contract-context/update-contract-context.component";

const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardContextComponent},
    {path: 'addHotel', component: AddHotelContextComponent},
    {path: 'find', component: FindHotelContextComponent},
    {path: 'hotel/:hotelId', component: AdminHotelDetailsComponent},
    {path: 'updateHotel/:hotelId', component: UpdateHotelContextComponent},
    {path: 'addContract/:hotelId', component: AddContractContextComponent},
    {path: 'addContractDetails', component: AddContractDetailsContextComponent},
    {path: 'contracts/:contractId', component: ViewContractContextComponent},
    {
      path: 'update/:contractId',
      component: UpdateContractContextComponent
    },


    {path: 'addMarkup', component: MarkupDetailsComponent},
    {path: 'addDiscount', component: DiscountDetailsComponent},
    {path: 'addSupplement', component: SupplementDetailsComponent},
    {path: 'addRoomType', component: RoomtypesDetailsComponent},
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {
}
