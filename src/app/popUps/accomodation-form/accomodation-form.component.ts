import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-accomodation-form',
  templateUrl: './accomodation-form.component.html',
  styleUrls: ['./accomodation-form.component.scss']
})
export class AccomodationFormComponent {
  constructor(private dialogRef:MatDialog , private dataService:DataServicesService,private snackbar:MatSnackBar){}
  existingData: any = [];
  noData: any = [];
  accomodationData:any = {

  }
  close(): void {
    this.dialogRef.closeAll()
  }
  submitAccomodation(){
    this.existingData = this.dataService.get('accomodation', 'local');
    if (this.existingData) {
      if (this.existingData.length > 0) {
        this.existingData.push(this.accomodationData)
        this.dataService.addToLocal('accomodation', this.existingData)
      } else {
        this.existingData.push(this.accomodationData)
        this.dataService.addToLocal('accomodation', this.existingData)
      }

    } else {
      this.noData.push(this.accomodationData)
      this.dataService.addToLocal('accomodation', this.noData)
    }
  }
}
