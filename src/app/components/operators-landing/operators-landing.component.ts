import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccomodationFormComponent } from 'src/app/popUps/accomodation-form/accomodation-form.component';
import { AccomodationTableComponent } from 'src/app/popUps/accomodation-table/accomodation-table.component';
import { ApprovedLeavesComponent } from 'src/app/popUps/approved-leaves/approved-leaves.component';
import { EmployeePoliiesComponent } from 'src/app/popUps/employee-poliies/employee-poliies.component';
import { FlightFormComponent } from 'src/app/popUps/flight-form/flight-form.component';
import { FlightTableComponent } from 'src/app/popUps/flight-table/flight-table.component';
import { MessagesComponent } from 'src/app/popUps/messages/messages.component';
import { MyProfileComponent } from 'src/app/popUps/my-profile/my-profile.component';
import { PendingLeavesComponent } from 'src/app/popUps/pending-leaves/pending-leaves.component';
import { PickUpFormComponent } from 'src/app/popUps/pick-up-form/pick-up-form.component';
import { PickUpTableComponent } from 'src/app/popUps/pick-up-table/pick-up-table.component';
import { TravelFormComponent } from 'src/app/popUps/travel-form/travel-form.component';
import { TravelTableComponent } from 'src/app/popUps/travel-table/travel-table.component';
import { VisaDetailsComponent } from 'src/app/popUps/visa-details/visa-details.component';
import { VisaFormComponent } from 'src/app/popUps/visa-form/visa-form.component';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-operators-landing',
  templateUrl: './operators-landing.component.html',
  styleUrls: ['./operators-landing.component.scss']
})
export class OperatorsLandingComponent {
  myCount:any=[]
  currentEmployee: any = {}
  policyDetails: any = this.dataService.get('policies','local')
  constructor(private matdialog: MatDialog, private dataService: DataServicesService, private router: Router) {
    const employeeDetails: any = this.dataService.get('currentUser', 'session');
    this.currentEmployee = employeeDetails;

    const count = this.dataService.get('messages', 'local') || [];
    this.myCount = count.filter((item: { sendTo: any; }) => item.sendTo == this.currentEmployee[0].email)
  }
  home() {
    this.router.navigate(['/log-in'])
  }
  LeavesRequest() {
    this.matdialog.open(PendingLeavesComponent)
  }
  showLeaves() {
    this.matdialog.open(ApprovedLeavesComponent)
  }
  ShowPolicy(policy: any): void {
    this.matdialog.open(EmployeePoliiesComponent, {
      data: policy
    });
  }
  showProfile(){
    this.matdialog.open(MyProfileComponent)
  }
  Operations(){
    this.router.navigate(['/operation-landing'])
  }
  ShowVisa(){
    this.matdialog.open(VisaDetailsComponent)
  }
  close():void{
    this.matdialog.closeAll()
  }
  Visa():void{
    this.matdialog.open(VisaDetailsComponent)
  }
  accomodation(){
    this.matdialog.open(AccomodationTableComponent)
  }
  flight(){
    this.matdialog.open(FlightTableComponent)
  }
  pickUp(){
    this.matdialog.open(PickUpTableComponent)
  }
  travel(){
    this.matdialog.open(TravelTableComponent)
  }
  messages(action:string){
    this.matdialog.open(MessagesComponent,{data: action})
    // console.log(action)
  }
}
