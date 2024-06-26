import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomDateAdapter} from "./shared/services/dateAdapter/custom-date-adapter.service";
import {DateAdapter} from "@angular/material/core";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {JWTInterceptorService} from "./security/services/Interceptor/jwt-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MatSnackBarModule
  ],
    providers: [
      { provide: DateAdapter, useClass: CustomDateAdapter },
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JWTInterceptorService,
        multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
