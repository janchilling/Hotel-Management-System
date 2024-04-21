import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeContextComponent } from './customer/components/home-context/home-context.component';
import {SearchResultsContextComponent} from "./customer/components/search-results-context/search-results-context.component";
import {HotelDetailsContextComponent} from "./customer/components/hotel-details-context/hotel-details-context.component";
import {CreateBookingContextComponent} from "./customer/components/create-booking-context/create-booking-context.component";
import {AllBookingsContextComponent} from "./customer/components/all-bookings-context/all-bookings-context.component";
import {ViewBookingContextComponent} from "./customer/components/view-booking-context/view-booking-context.component";
import { PermissionsService } from '../security/services/permissionService/permission-service.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      { path: 'home',
        component: HomeContextComponent
      },
      { path: 'results',
        component: SearchResultsContextComponent
      },
      { path: 'hotel/:hotelId',
        component: HotelDetailsContextComponent
      },
      { path: 'booking',
        component: CreateBookingContextComponent,
        canActivate: [PermissionsService],
        data: { expectedRole: 'CUSTOMER' }
      },
      { path: 'myBookings/:userId',
        component: AllBookingsContextComponent,
        canActivate: [PermissionsService],
        data: { expectedRole: 'CUSTOMER' }
      },
      { path: 'booking/:bookingId',
        component: ViewBookingContextComponent,
        canActivate: [PermissionsService],
        data: { expectedRole: 'CUSTOMER' }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
