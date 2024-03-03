import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  allUsers: any = []
  sessionData: any = []
  adminDetails: any = {
    userId: '01',
    firstName: 'Kearabetswe',
    lastName: 'Maja',
    email: 'admin@affrikatikkun.com',
    gender: 'Male',
    role: 'Admin',
    password: 'Admin@123'
  }

  emailPattern = '/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/'
  loginFormData: any = {
    email: '',
    password: ''
  }
  hide = true;
  constructor(private snackbar: MatSnackBar, private router: Router, private dataService: DataServicesService) {
    // if (this.dataService.get('users', 'local').length > 0) {
    //   this.allUsers = this.dataService.get('users', 'local') || [];
    // }
    this.allUsers = this.dataService.get('users', 'local') || [];
  }

  submit() {

    if (this.allUsers.length > 0) {
      const currentUser = this.allUsers.find((item: any) => item.email === this.loginFormData.email && item.password === this.loginFormData.password)
      if (currentUser) {
        this.sessionData.push(currentUser)
        this.dataService.addToSession('currentUser', this.sessionData)
        this.snackbar.open('log-in successfully', 'OK')
        if (currentUser.role.toUpperCase() == 'ADMINISTRATOR') {
          this.router.navigate(['/admin-landing'])
        } else if (currentUser.role.toUpperCase() == 'EMPLOYEE') {
          this.router.navigate(['/employee-landing'])

        } else if (currentUser.role.toUpperCase() == 'MANAGER') {
          this.router.navigate(['/manager-landing'])
        } else if (currentUser.role.toUpperCase() == 'OPERATOR') {
          this.router.navigate(['/operators-landing'])
        }
        else {
          this.router.navigate(['/admin-landing'])
        }

      } else {
        this.snackbar.open('User does not exist in the system', 'OK');
        this.loginFormData.email = '';
        this.loginFormData.password='';
        return
      }
    } else {
      if (this.loginFormData.email === this.adminDetails.email && this.adminDetails.password === this.loginFormData.password) {
        this.dataService.addToSession('cuurentUser',this.adminDetails)
        this.snackbar.open('admin log-in successfully', 'OK')
        this.router.navigate(['/admin-landing'])
      } else {
        this.snackbar.open('user not found,please add users', 'OK')
      }
    }


  }
}
