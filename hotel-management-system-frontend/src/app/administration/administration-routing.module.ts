import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import {DashboardContextComponent} from "./dashboard-context/dashboard-context.component";
import {AddHotelContextComponent} from "./add-hotel-context/add-hotel-context.component";
import {AddContractContextComponent} from "./add-contract-context/add-contract-context.component";

const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardContextComponent },
    { path: 'addHotel', component: AddHotelContextComponent },
    { path: 'addContract', component: AddContractContextComponent },
    { path: 'addMarkup', component: AddContractContextComponent },
    { path: 'addDiscount', component: AddContractContextComponent },
    { path: 'addSupplement', component: AddContractContextComponent },
    { path: 'addRoomType', component: AddContractContextComponent },
  ],
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
