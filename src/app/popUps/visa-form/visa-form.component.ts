import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-visa-form',
  templateUrl: './visa-form.component.html',
  styleUrls: ['./visa-form.component.scss']
})
export class VisaFormComponent {
  currentEmployee: any = []
  isStatus = false;

  constructor(private dialogRef: MatDialog, private dataService: DataServicesService, private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if(data){
      this.visaFormData = data;
      console.log('populating data',this.visaFormData)
    }
    else{
      this.isStatus = true;
      this.visaFormData = {
        status : this.visaStatus[0]
      }
    }

    this.currentEmployee = this.dataService.get('currentUser', 'session');
    console.log(this.currentEmployee[0].role)
    // if ((this.currentEmployee[0].role.toUpperCase()) !== 'MANAGER') {
    //   this.visaFormData = {}
    //   this.visaFormData.status = this.leaveStatus[0]
    //   this.isStatus = true;

    // } else {

    //   this.visaFormData = data;
    //   console.log("we reveiving this", this.data)
    // }

  } 
  existingData: any = [];
  noData: any = [];
  visaFormData: any = {

  }
  visaStatus: any = ['Pending', 'Approved', 'Rejected'];
  close(): void {
    this.dialogRef.closeAll()
  }
  submitVisa() {
    this.existingData = this.dataService.get('visa', 'local');
    if (this.existingData) {
      if (this.existingData.length > 0) {
        this.existingData.push(this.visaFormData)
        this.dataService.addToLocal('visa', this.existingData)
      } else {
        this.existingData.push(this.visaFormData)
        this.dataService.addToLocal('visa', this.existingData)
      }

    } else {
      this.noData.push(this.visaFormData)
      this.dataService.addToLocal('visa', this.noData)
    }
    this.close();
  }

}
