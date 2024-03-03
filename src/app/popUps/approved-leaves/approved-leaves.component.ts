import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataServicesService } from 'src/app/services/data-services.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { PendingLeavesComponent } from '../pending-leaves/pending-leaves.component';

@Component({
  selector: 'app-approved-leaves',
  templateUrl: './approved-leaves.component.html',
  styleUrls: ['./approved-leaves.component.scss']
})
export class ApprovedLeavesComponent {
  isStatus:boolean=true;
  policyFormData: any = { leaveStatus: '' }
  ApprovedData:any=[];
  displayedColumns: string[] = ['$implicit', 'index', 'edit', 'numberOfDays', 'leaveStatus','ApprovedBy'];
  leaveStatus: any = ['Approved', 'Pending', 'Rejected']
  constructor(private matdialog: MatDialog, private dataservice: DataServicesService) {
    this.ApprovedData = this.dataservice.get('leave', 'local') || []

    this.tableData=this.ApprovedData.filter((item: { status: string; }) => item.status==='Approved');
    console.log(this.tableData)
  }
  tableData:any=[];
  

  close() {

    this.matdialog.closeAll()
  }
}
