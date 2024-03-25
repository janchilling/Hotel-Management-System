import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeContextComponent } from './customer/home-context/home-context.component';
import { HomeTopContainerComponent } from './customer/home-context/inner-items/home-top-container/home-top-container.component';
import { HomeEventsComponent } from './customer/home-context/inner-items/home-events/home-events.component';
import { HomeAdventureComponent } from './customer/home-context/inner-items/home-adventure/home-adventure.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsContextComponent } from './customer/search-results-context/search-results-context.component';
import { ResultCardComponent } from './customer/search-results-context/inner-items/result-card/result-card.component';
import {HotelDetailsContextComponent} from "./customer/hotel-details-context/hotel-details-context.component";
import { HotelOverviewComponent } from './customer/hotel-details-context/inner-items/hotel-overview/hotel-overview.component';
import { HotelRoomComponent } from './customer/hotel-details-context/inner-items/hotel-room/hotel-room.component';
import { CreateBookingContextComponent } from './customer/create-booking-context/create-booking-context.component';
import { BookingDetailsComponent } from './customer/create-booking-context/inner-items/booking-details/booking-details.component';
import { SelectDetailsComponent } from './customer/create-booking-context/inner-items/booking-details/items/select-details/select-details.component';
import { ContactDetailsComponent } from './customer/create-booking-context/inner-items/booking-details/items/contact-details/contact-details.component';
import { BookingPaymentComponent } from './customer/create-booking-context/inner-items/booking-payment/booking-payment.component';
import { BookingConfirmationComponent } from './customer/create-booking-context/inner-items/booking-confirmation/booking-confirmation.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeContextComponent,
    HomeTopContainerComponent,
    HomeEventsComponent,
    HomeAdventureComponent,
    SearchResultsContextComponent,
    ResultCardComponent,
    HotelDetailsContextComponent,
    HotelOverviewComponent,
    HotelRoomComponent,
    CreateBookingContextComponent,
    BookingDetailsComponent,
    SelectDetailsComponent,
    ContactDetailsComponent,
    BookingPaymentComponent,
    BookingConfirmationComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        NgOptimizedImage
    ]
})
export class MainModule { }
