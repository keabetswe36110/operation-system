import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyProfileComponent } from 'src/app/popUps/my-profile/my-profile.component';
import { PolicyDetailsComponent } from 'src/app/popUps/policy-details/policy-details.component';
import { DataServicesService } from 'src/app/services/data-services.service';
import { PoliciesComponent } from '../policies/policies.component';
import { EmployeePoliiesComponent } from 'src/app/popUps/employee-poliies/employee-poliies.component';
import { MessagesComponent } from 'src/app/popUps/messages/messages.component';

@Component({
  selector: 'app-admin-as-employee',
  templateUrl: './admin-as-employee.component.html',
  styleUrls: ['./admin-as-employee.component.scss']
})
export class AdminAsEmployeeComponent {

  myCount:any=[]
  currentEmployee: any = {}

  constructor(private dataService:DataServicesService,private router: Router, private matdialog:MatDialog){
    const employeeDetails: any = this.dataService.get('currentUser', 'session');
    this.currentEmployee = employeeDetails;
    const count= this.dataService.get('messages', 'local') || [];
    this.myCount=count.filter((item: { sendTo: any; }) =>   item.sendTo==this.currentEmployee[0].email)
  }
  policyDetails: any = this.dataService.get('policies','local')
  adminDetails: any = this.dataService.get('admin','local') || []
  
  home() {
    this.router.navigate(['/log-in'])
  }
  switchUsers(){
    this.router.navigate(['/admin-landing'])
  }

  showProfile(){
    this.matdialog.open(MyProfileComponent)
  }
  ShowPolicy(policy:any): void{
    this.matdialog.open(EmployeePoliiesComponent,{
       data: policy
      });
    console.log(this.policyDetails)
  }
  Operations(){
    this.router.navigate(['/operation-landing'])
  }
  messages(action:string){
    this.matdialog.open(MessagesComponent,{data: action})
    if(action==='readMe'){
      this.myCount= this.myCount.filter((item: { sendTo: any; }) => item.sendTo != this.currentEmployee[0].email)
      console.log(this.myCount)
      this.dataService.addToLocal('messages',this.myCount)
    }
  }

}
