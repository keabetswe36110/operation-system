import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApprovedLeavesComponent } from 'src/app/popUps/approved-leaves/approved-leaves.component';
import { EmployeePoliiesComponent } from 'src/app/popUps/employee-poliies/employee-poliies.component';
import { MessagesComponent } from 'src/app/popUps/messages/messages.component';
import { MyProfileComponent } from 'src/app/popUps/my-profile/my-profile.component';
import { PendingLeavesComponent } from 'src/app/popUps/pending-leaves/pending-leaves.component';
import { VisaDetailsComponent } from 'src/app/popUps/visa-details/visa-details.component';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-manager-landing',
  templateUrl: './manager-landing.component.html',
  styleUrls: ['./manager-landing.component.scss']
})

export class ManagerLandingComponent {
  notification: boolean = false;
  leavesNotifications: any = []
  visaNotifications: any = []
  myCount: any = []
  allNoti: any = []
  currentEmployee: any = {}
  policyDetails: any = this.dataService.get('policies', 'local')
  constructor(private matdialog: MatDialog, private dataService: DataServicesService, private router: Router) {
    const employeeDetails: any = this.dataService.get('currentUser', 'session');
    this.currentEmployee = employeeDetails;

    // massages
    const count = this.dataService.get('messages', 'local') || [];
    this.myCount = count.filter((item: { sendTo: any; }) => item.sendTo == this.currentEmployee[0].email)
    // visa applications.
    let visaData = this.dataService.get('visa', 'local') || [];
    if (visaData.length > 0) {
      visaData = visaData.filter((item: { status: string; }) => item.status !== 'Approved')
    }
    this.visaNotifications = visaData;
    // leaves
    let leavesData = this.dataService.get('leave', 'local') || []
    if (leavesData.length > 0) {
      leavesData = leavesData.filter((item: { status: string; }) => item.status !== 'Approved')
    }
    this.leavesNotifications = leavesData;
    if (this.leavesNotifications.length > 0 || this.visaNotifications.length > 0) {
      this.notification = true;
      // (this.leavesNotifications.length == 0) ? this.allNoti = this.visaNotifications : this.allNoti = this.leavesNotifications
    }
    this.allNoti = (visaData.length + leavesData.length);



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
  showProfile() {
    this.matdialog.open(MyProfileComponent)
  }
  Operations() {
    this.router.navigate(['/operation-landing'])
  }
  ShowVisa() {
    this.matdialog.open(VisaDetailsComponent)
  }
  messages(action: string) {
    this.matdialog.open(MessagesComponent, { data: action })
  }
}
