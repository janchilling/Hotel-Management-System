import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CustomDateAdapter} from "./shared/services/dateAdapter/custom-date-adapter.service";
import {DateAdapter} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
    providers: [
      { provide: DateAdapter, useClass: CustomDateAdapter }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
