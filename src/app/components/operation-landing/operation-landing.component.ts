import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccomodationFormComponent } from 'src/app/popUps/accomodation-form/accomodation-form.component';
import { FlightFormComponent } from 'src/app/popUps/flight-form/flight-form.component';
import { PickUpFormComponent } from 'src/app/popUps/pick-up-form/pick-up-form.component';
import { TravelFormComponent } from 'src/app/popUps/travel-form/travel-form.component';
import { VisaFormComponent } from 'src/app/popUps/visa-form/visa-form.component';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-operation-landing',
  templateUrl: './operation-landing.component.html',
  styleUrls: ['./operation-landing.component.scss']
})
export class OperationLandingComponent {

  constructor(private matdialog:MatDialog,
    private snackbar:MatSnackBar,private dataSevice:DataServicesService,
    private router:Router){
    this.currentEmployee = this.dataSevice.get('currentUser','session');

    if(this.currentEmployee[0].role.toLowerCase()==='employee'){
      this.link = '/employee-landing'
    }else if(this.currentEmployee[0].role.toLowerCase()==='manager'){
      this.link = '/manager-landing'
    }else if(this.currentEmployee[0].role.toLowerCase()==='operator'){
      this.link = '/operators-landing'
    }else{
      this.link = '/admin-landing'
    }

  }
  link:any = '/admin-landing'
  currentEmployee:any={}
  Visa():void{
    this.matdialog.open(VisaFormComponent)
  }
  accomodation(){
    this.matdialog.open(AccomodationFormComponent)
  }
  flight(){
    this.matdialog.open(FlightFormComponent)
  }
  pickUp(){
    this.matdialog.open(PickUpFormComponent)
  }
  travel(){
    this.matdialog.open(TravelFormComponent)
  }
  home() {
    this.router.navigate(['/log-in'])
  }

}
