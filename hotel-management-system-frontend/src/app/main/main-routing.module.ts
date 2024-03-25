import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeContextComponent } from './customer/home-context/home-context.component';
import {SearchResultsContextComponent} from "./customer/search-results-context/search-results-context.component";
import {HotelDetailsContextComponent} from "./customer/hotel-details-context/hotel-details-context.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeContextComponent },
      { path: 'results', component: SearchResultsContextComponent },
      { path: 'hotel/:hotelId', component: HotelDetailsContextComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
