import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.scss']
})
export class TravelFormComponent {
  constructor(private dialogRef: MatDialog ,private dataService:DataServicesService,private snackbar:MatSnackBar) { }
  existingData: any = [];
  noData: any = [];
  travelFormData: any = {

  }
  close(): void {
    this.dialogRef.closeAll()
  }
  submitTravelForm() {
    this.existingData = this.dataService.get('travel', 'local');
    if (this.existingData) {
      if (this.existingData.length > 0) {
        console.log('hello world')
        this.existingData.push(this.travelFormData)
        this.dataService.addToLocal('travel', this.existingData)
      } else {
        this.existingData.push(this.travelFormData)
        this.dataService.addToLocal('travel', this.existingData)
      }

    } else {
      this.noData.push(this.travelFormData)
      this.dataService.addToLocal('travel', this.noData)
    }
    this.close();
  }
}
