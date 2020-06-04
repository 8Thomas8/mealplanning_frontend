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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
