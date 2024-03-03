import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-pick-up-form',
  templateUrl: './pick-up-form.component.html',
  styleUrls: ['./pick-up-form.component.scss']
})
export class PickUpFormComponent {
  constructor(private dialogRef:MatDialog,private dataService:DataServicesService,private snackbar:MatSnackBar){}
  existingData:any=[];
  noData:any=[];
  pickUpFormData:any = {

  }
  close(): void {
    this.dialogRef.closeAll()
  }
  submitpickUpForm(){
    this.existingData = this.dataService.get('pickUp','local');
    if(this.existingData){
      if(this.existingData.length>0){
        this.existingData.push(this.pickUpFormData)
        this.dataService.addToLocal('pickUp',this.existingData)
      }else{
        this.existingData.push(this.pickUpFormData)
        this.dataService.addToLocal('pickUp',this.existingData)
      }
  
    }else{
      this.noData.push(this.pickUpFormData)
      this.dataService.addToLocal('pickUp',this.noData)
    }
    this.close();
  }

}
