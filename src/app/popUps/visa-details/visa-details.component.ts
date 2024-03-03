import { Component } from '@angular/core';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { MatDialog } from '@angular/material/dialog';
import { DataServicesService } from 'src/app/services/data-services.service';
import { VisaFormComponent } from '../visa-form/visa-form.component';

@Component({
  selector: 'app-visa-details',
  templateUrl: './visa-details.component.html',
  styleUrls: ['./visa-details.component.scss']
})
export class VisaDetailsComponent {
  policyFormData: any = { leaveStatus: '' }
  displayedColumns: string[] = ['$implicit', 'index', 'edit', 'numberOfDays', 'leaveStatus'];
  leaveStatus: any = ['Approved', 'Pending', 'Rejected']
  constructor(private matdialog: MatDialog, private dataservice: DataServicesService) {

  }
  visaFormData: any = this.dataservice.get('visa', 'local') || []

  showLeaves(dataReceived:any){
    console.log("ayobaness",dataReceived)
    this.matdialog.open(VisaFormComponent ,{
      data: dataReceived
    })
  }
  close() {
    this.matdialog.closeAll()
  }

}
