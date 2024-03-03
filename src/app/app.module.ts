import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminLandingComponent } from './components/admin-landing/admin-landing.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { LandingComponent } from './components/landing/landing.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { PolicyFormComponent } from './popUps/policy-form/policy-form.component';
import { MatDialog } from '@angular/material/dialog';
import { PolicyDetailsComponent } from './popUps/policy-details/policy-details.component';
import { EmployeeLandingComponent } from './components/employee-landing/employee-landing.component';
import { AdminAsEmployeeComponent } from './components/admin-as-employee/admin-as-employee.component';
import { MyProfileComponent } from './popUps/my-profile/my-profile.component';
import { EmployeePoliiesComponent } from './popUps/employee-poliies/employee-poliies.component';
import { LeaveFormComponent } from './popUps/leave-form/leave-form.component';
import { OperationLandingComponent } from './components/operation-landing/operation-landing.component';
import { VisaFormComponent } from './popUps/visa-form/visa-form.component';
import { AccomodationFormComponent } from './popUps/accomodation-form/accomodation-form.component';
import { FlightFormComponent } from './popUps/flight-form/flight-form.component';
import { PickUpFormComponent } from './popUps/pick-up-form/pick-up-form.component';
import { TravelFormComponent } from './popUps/travel-form/travel-form.component';
import { ApprovedLeavesComponent } from './popUps/approved-leaves/approved-leaves.component';
import { ManagerLandingComponent } from './components/manager-landing/manager-landing.component';
import { OperatorsLandingComponent } from './components/operators-landing/operators-landing.component';
import { PendingLeavesComponent } from './popUps/pending-leaves/pending-leaves.component';
import { VisaDetailsComponent } from './popUps/visa-details/visa-details.component';
import { VisaTableComponent } from './popUps/visa-table/visa-table.component';
import { PickUpTableComponent } from './popUps/pick-up-table/pick-up-table.component';
import { AccomodationTableComponent } from './popUps/accomodation-table/accomodation-table.component';
import { FlightTableComponent } from './popUps/flight-table/flight-table.component';
import { TravelTableComponent } from './popUps/travel-table/travel-table.component';
import { MessagesComponent } from './popUps/messages/messages.component';




@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    PageNotFoundComponent,
    AdminLandingComponent,
    AllUsersComponent,
    LandingComponent,
    PoliciesComponent,
    PolicyFormComponent,
    PolicyDetailsComponent,
    EmployeeLandingComponent,
    AdminAsEmployeeComponent,
    MyProfileComponent,
    EmployeePoliiesComponent,
    LeaveFormComponent,
    OperationLandingComponent,
    VisaFormComponent,
    AccomodationFormComponent,
    FlightFormComponent,
    PickUpFormComponent,
    TravelFormComponent,
    ApprovedLeavesComponent,
    ManagerLandingComponent,
    OperatorsLandingComponent,
    PendingLeavesComponent,
    VisaDetailsComponent,
    VisaTableComponent,
    PickUpTableComponent,
    AccomodationTableComponent,
    FlightTableComponent,
    TravelTableComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
