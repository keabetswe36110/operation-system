import { AfterViewInit, Component, ElementRef, IterableDiffers, ViewChild, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataServicesService } from 'src/app/services/data-services.service';
import { Chart } from 'chart.js/auto';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']

})
export class MyProfileComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChart!: ElementRef
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  changing: any = {};
  allUsers: any = [];
  myLeaves: any = [];
  hide = true;
  annualLeaves: number = 10;
  sickLeaves: number = 5;
  familyLeaves: number = 3;


  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<MyProfileComponent>,
    private dataService: DataServicesService, private snackbar: MatSnackBar,
    private router: Router) {

    this.myProfileDetails = this.dataService.get('currentUser', 'session');
    this.allUsers = this.dataService.get('users', 'local');
    this.myLeaves = this.dataService.get('leave', 'local');
    this.myLeaves = this.myLeaves.filter((leave: { email: any; }) => leave.email === this.myProfileDetails[0].email)

    console.log(this.myProfileDetails)

    this.myLeaves.forEach((item: any) => {
      if (item.type.toLowerCase() === 'annual') {
        this.myProfileDetails[0].annualLeaves = this.myProfileDetails[0].annualLeaves - item.daysNo
      } else if (item.type.toLowerCase() === 'sick') {

        if (this.myProfileDetails[0].sickLeaves > 0) {
          this.myProfileDetails[0].sickLeaves = this.myProfileDetails[0].sickLeaves - item.daysNo
          
        } else {
          this.myProfileDetails[0].sickLeaves = 0;
        }
      } else {
        this.myProfileDetails[0].familyLeaves = this.myProfileDetails[0].familyLeaves - item.daysNo
      }
    })

  }



  ngAfterViewInit(): void {
    const ctx = this.pieChart.nativeElement.getContext('2d');
    const data = {
      labels: ['Number of Annual leaves', 'Number of sick leaves', 'Number of family leaves'],
      datasets: [{
        data: [this.myProfileDetails[0].annualLeaves, this.myProfileDetails[0].sickLeaves, this.myProfileDetails[0].familyLeaves],
        backgroundColor: ['red', 'blue', 'green']
      }]
    };
    const options = {};
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });

  }

  // deducting the leaves


  changePassword() {

    // console.log("all users",this.allUsers)
    if (this.changing.oldPassword != this.myProfileDetails[0].password) {
      this.snackbar.open('wrong old password entered, please enter the correct old password', 'OK', { duration: 3000 })
      return
    }
    const existingOne = this.allUsers.find((item: { email: any; }) => item.email === this.myProfileDetails[0].email)
    if (existingOne) {
      this.myProfileDetails[0].password = this.changing.newPassword;
      this.allUsers = this.allUsers.filter((item: { email: any; }) => item.email !== this.myProfileDetails[0].email)
      this.allUsers.push(this.myProfileDetails[0])
      this.dataService.addToLocal('users', this.allUsers)
      this.snackbar.open('password changed succesfully!,please log in again', 'OK', { duration: 3000 })
      this.dialogRef.close();
      this.router.navigate(['/log-in'])

    }
    else {
      console.log("we not winning....")
    }

  }
  myProfileDetails: any = {
  }

  close(message: string = ''): void {
    this.dialog.closeAll();
  }

}
