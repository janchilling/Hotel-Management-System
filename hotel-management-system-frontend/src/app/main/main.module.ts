import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {HomeContextComponent} from './customer/components/home-context/home-context.component';
import {
  HomeTopContainerComponent
} from './customer/components/home-context/inner-items/home-top-container/home-top-container.component';
import {HomeEventsComponent} from './customer/components/home-context/inner-items/home-events/home-events.component';
import {SharedModule} from '../shared/shared.module';
import {
  SearchResultsContextComponent
} from './customer/components/search-results-context/search-results-context.component';
import {
  ResultCardComponent
} from './customer/components/search-results-context/inner-items/result-card/result-card.component';
import {
  HotelDetailsContextComponent
} from "./customer/components/hotel-details-context/hotel-details-context.component";
import {
  HotelOverviewComponent
} from './customer/components/hotel-details-context/inner-items/hotel-overview/hotel-overview.component';
import {
  HotelRoomComponent
} from './customer/components/hotel-details-context/inner-items/hotel-room/hotel-room.component';
import {
  CreateBookingContextComponent
} from './customer/components/create-booking-context/create-booking-context.component';
import {
  BookingDetailsComponent
} from './customer/components/create-booking-context/inner-items/booking-details/booking-details.component';
import {
  SelectDetailsComponent
} from './customer/components/create-booking-context/inner-items/booking-details/items/select-details/select-details.component';
import {
  ContactDetailsComponent
} from './customer/components/create-booking-context/inner-items/booking-details/items/contact-details/contact-details.component';
import {
  BookingPaymentComponent
} from './customer/components/create-booking-context/inner-items/booking-payment/booking-payment.component';
import {
  BookingConfirmationComponent
} from './customer/components/create-booking-context/inner-items/booking-confirmation/booking-confirmation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  AllHotelsTopContainerComponent
} from './customer/components/search-results-context/inner-items/all-hotels-top-container/all-hotels-top-container.component';
import {
  AllHotelsBottomContainerComponent
} from './customer/components/search-results-context/inner-items/all-hotels-bottom-container/all-hotels-bottom-container.component';
import {AllBookingsContextComponent} from './customer/components/all-bookings-context/all-bookings-context.component';
import {
  AllBookingResultCardsComponent
} from './customer/components/all-bookings-context/all-booking-result-cards/all-booking-result-cards.component';
import {ViewBookingContextComponent} from "./customer/components/view-booking-context/view-booking-context.component";
import {SecurityModule} from "../security/security.module";
import {
  HotelOffersComponent
} from './customer/components/hotel-details-context/inner-items/hotel-offers/hotel-offers.component';
import {MainSearchbarComponent} from "./customer/shared/components/main-searchbar/main-searchbar.component";
import {
  BookingConfirmationCardComponent
} from "./customer/shared/components/booking-confirmation-card/booking-confirmation-card.component";
import {
  PopUpClashingBookingsComponent
} from './customer/shared/components/pop-up-clashing-bookings/pop-up-clashing-bookings.component';
import {RoomCardComponent} from "./customer/shared/components/room-card/room-card.component";
import { PopUpMoreInfoComponent } from './customer/shared/components/pop-up-more-info/pop-up-more-info/pop-up-more-info.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeContextComponent,
    HomeTopContainerComponent,
    HomeEventsComponent,
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
    BookingConfirmationComponent,
    AllHotelsTopContainerComponent,
    AllHotelsBottomContainerComponent,
    AllBookingsContextComponent,
    AllBookingResultCardsComponent,
    ViewBookingContextComponent,
    HotelOffersComponent,
    MainSearchbarComponent,
    BookingConfirmationCardComponent,
    PopUpClashingBookingsComponent,
    RoomCardComponent,
    PopUpMoreInfoComponent
  ],
  exports: [
    ResultCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    SecurityModule
  ]
})
export class MainModule {
}
