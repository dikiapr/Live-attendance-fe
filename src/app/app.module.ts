import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceDashboardComponent } from './components/attendance-dashboard/attendance-dashboard.component';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    AttendanceDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebcamModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
