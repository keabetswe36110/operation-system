import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { EmployeePoliiesComponent } from 'src/app/popUps/employee-poliies/employee-poliies.component';
import { MessagesComponent } from 'src/app/popUps/messages/messages.component';
import { MyProfileComponent } from 'src/app/popUps/my-profile/my-profile.component';
import { DataServicesService } from 'src/app/services/data-services.service';


@Component({
  selector: 'app-employee-landing',
  templateUrl: './employee-landing.component.html',
  styleUrls: ['./employee-landing.component.scss']
})
export class EmployeeLandingComponent implements AfterViewInit {
  myCount: any = []
  currentEmployee: any = {}
  policyDetails: any = this.dataService.get('policies', 'local')

  constructor(private matdialog: MatDialog, private router: Router, private dataService: DataServicesService) {
    const employeeDetails: any = this.dataService.get('currentUser', 'session');
    this.currentEmployee = employeeDetails;
    const count = this.dataService.get('messages', 'local') || [];
    this.myCount = count.filter((item: { sendTo: any; }) => item.sendTo == this.currentEmployee[0].email)
  }
  ngAfterViewInit(): void {

  }

  showProfile() {
    this.matdialog.open(MyProfileComponent)
  }
  ShowPolicy(policy: any): void {
    this.matdialog.open(EmployeePoliiesComponent, {
      data: policy
    });
  }
  Operations() {
    this.router.navigate(['/operation-landing'])
  }
  home() {
    this.router.navigate(['/log-in'])
  }
  messages(action: string) {
    this.matdialog.open(MessagesComponent, { data: action })
    if (action === 'readMe') {
      this.myCount = this.myCount.filter((item: { sendTo: any; }) => item.sendTo != this.currentEmployee[0].email)
      console.log(this.myCount)
      this.dataService.addToLocal('messages', this.myCount)
    }
  }
  arr: any[] = ['../../../assets/pictures/peakpx.jpg', '../../../assets/pictures/background-image.jpg','../../../assets/pictures/light-blue-abstract-background-with-circle_155083-329.avif','../../../assets/pictures/sunrise.jpg']

  backgroundImage: any = this.changeBackgroundImage()  // Initial background image

  changeBackgroundImage() {
    // Change background image to a different image
    this.backgroundImage = this.getRandomItem(this.arr);
  }

  getRandomItem(arr: any) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }

}
