import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { NavComponent } from './commons/nav/nav.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { DashboardComponent } from './user-dashboard/dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { SidebarContentComponent } from './user-dashboard/sidebar-content/sidebar-content.component';
import { DashboardContentComponent } from './user-dashboard/dashboard-content/dashboard-content.component';
import { CalendarComponent } from './user-dashboard/calendar/calendar.component';
import { OverlayComponent } from './commons/overlay/overlay.component';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats} from '@angular/material/core';

export const MY_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    DashboardComponent,
    AccountComponent,
    SidebarContentComponent,
    DashboardContentComponent,
    CalendarComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT }],
  bootstrap: [AppComponent]
})
export class AppModule { }

