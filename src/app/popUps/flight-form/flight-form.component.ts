import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent {
  constructor(private dialogRef: MatDialog, private dataService: DataServicesService, private snackbar: MatSnackBar) { }
  flightData: any = [];
  existingData: any = [];
  flightFormData: any = {
  }

  submitFlightForm() {
    this.existingData = this.dataService.get('flight', 'local');
    if (this.existingData) {
      if (this.existingData.length > 0) {
        this.existingData.push(this.flightFormData)
        this.dataService.addToLocal('flight', this.existingData)
      } else {
        this.flightData.push(this.flightFormData)
        this.dataService.addToLocal('flight', this.flightData)
      }

    } else {
      this.flightData.push(this.flightFormData)
      this.dataService.addToLocal('flight', this.flightData)
    }
    this.close()
  }
  close():void{
    this.dialogRef.closeAll()
  }


}
