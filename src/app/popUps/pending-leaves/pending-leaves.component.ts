import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServicesService } from 'src/app/services/data-services.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';

@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrls: ['./pending-leaves.component.scss']
})
export class PendingLeavesComponent {
  displayedColumns: string[] = ['$implicit', 'index', 'edit', 'numberOfDays', 'leaveStatus', 'Action'];
  leaveStatus: any = ['Approved', 'Pending', 'Rejected']
  constructor(private matdialog: MatDialog, private dataservice: DataServicesService) {
    // console.log(this.dataservice.get('leave', 'local'))
    // console.log(this.leavesData)
  }

  statusChange: any = [];

  leavesDatas: any = this.dataservice.get('leave', 'local')

  leavesData: any = this.leavesDatas.filter((item: { status: string; }) => item.status.toUpperCase() != 'APPROVED')

  update(receivedData: any) {
    let matchingUser = this.leavesDatas.find((user: { id: any; }) => user.id === receivedData.id)
    console.log(matchingUser)
    matchingUser.status = 'Approved';

    this.leavesDatas = this.leavesDatas.filter((item: any) => item.id != receivedData.id)
    
    this.statusChange = this.leavesDatas;
    this.statusChange.push(matchingUser);

    this.dataservice.addToLocal('leave',this.statusChange)
  }

  showLeaves(dataReceived: any) {


    if (dataReceived.status != 'Approved') {
      this.matdialog.open(LeaveFormComponent, {
        data: dataReceived
      })
    }
  }
  close() {
    this.matdialog.closeAll()
  }
}
