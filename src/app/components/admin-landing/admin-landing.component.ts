import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApprovedLeavesComponent } from 'src/app/popUps/approved-leaves/approved-leaves.component';
import { MessagesComponent } from 'src/app/popUps/messages/messages.component';
import { DataServicesService } from 'src/app/services/data-services.service';
import *as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent {
  myCount:any=[]
  currentEmployee: any = {}
  allUsers: any = [];
  newExcel : any =[];

  constructor(private router: Router, private snackbar: MatSnackBar,private matdialog:MatDialog ,private dataService:DataServicesService) { 
    const employeeDetails: any = this.dataService.get('currentUser', 'session');
    this.currentEmployee = employeeDetails;
    const count= this.dataService.get('messages', 'local') || [];
    this.myCount=count.filter((item: { sendTo: any; }) =>   item.sendTo==this.currentEmployee[0].email)
  }

  Test() {
    this.router.navigate(['/page-not-found']);
  }
  home() {
    this.router.navigate(['/log-in'])
  }
  UploadDoc(event: any) {

    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let convertedData = XLSX.read(binaryData, { type: 'binary' });

      let _users = localStorage.getItem('users');
      const users = _users ? JSON.parse(_users) : []

      convertedData.SheetNames.forEach(user => {
        const excelData = XLSX.utils.sheet_to_json(convertedData.Sheets[user])
        // console.log(excelData)
        this.newExcel.push(excelData)
        // console.log(this.newExcel[0])

      })
      
      if(users.length<1){
        localStorage.setItem('users',JSON.stringify(this.newExcel[0]));
        return
      }else{

        let newusers;
        let existingUser=this.newExcel[0].find((item:any , indx:any)=> item.email===users[indx].email);
        this.newExcel[0].forEach((newUser: any) => {-
          console.log(newUser.email,'main adreess')
          let matchFound = false;
          users.forEach((existingUser: any) => {
            console.log(existingUser.email,'inner adreess')
            if(newUser.email === existingUser.email) {
              console.log('existing');
              matchFound = true;
              //
            } else {
              // console.log('pushing inner adreess');
              // newusers.push(newUser)
            }

          })
          
          if(matchFound){
            console.log('one address matching');
            newUser.email
          } else {
            
            users.push(newUser)
            this.dataService.addToLocal('users',users)
            console.log('no addresses matching');
          }
          console.log('=====================================')

        })

        
        // let notExistingUser = this.newExcel[0].filter((item: any, indx:any) => item != existingUser)
        // console.log(existingUser);
    
        if(existingUser){
          this.snackbar.open(`${existingUser.firstName} with email ${existingUser.email} already exist in the system`, 'OK')
          return
        }else{
          console.log("lets add you")
          this.snackbar.open('No user found','OK');
          localStorage.setItem('users',JSON.stringify(this.newExcel[0]));
        }
      }

    }


    this.router.navigate(['/landing/all-users'])
  }
  policies(){
    this.router.navigate(['/landing/policies'])
  }
  switchUsers(){
    this.router.navigate(['/admin-as-employee'])
  }
  ApprovedLeaves(){
    this.matdialog.open(ApprovedLeavesComponent)
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
