import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeContextComponent } from './customer/home-context/home-context.component';
import { HomeTopContainerComponent } from './customer/home-context/inner-items/home-top-container/home-top-container.component';
import { HomeEventsComponent } from './customer/home-context/inner-items/home-events/home-events.component';
import { HomeAdventureComponent } from './customer/home-context/inner-items/home-adventure/home-adventure.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsContextComponent } from './customer/search-results-context/search-results-context.component';
import { ResultCardComponent } from './customer/search-results-context/inner-items/result-card/result-card.component';
import { HotelDetailsContextComponent } from './customer/hotel-details-context/hotel-details-context/hotel-details-context.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeContextComponent,
    HomeTopContainerComponent,
    HomeEventsComponent,
    HomeAdventureComponent,
    SearchResultsContextComponent,
    ResultCardComponent,
    HotelDetailsContextComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
