import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServicesService } from 'src/app/services/data-services.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';

@Component({
  selector: 'app-pick-up-table',
  templateUrl: './pick-up-table.component.html',
  styleUrls: ['./pick-up-table.component.scss']
})
export class PickUpTableComponent {
  
  displayedColumns: string[] = ['$implicit', 'index', 'edit', 'numberOfDays','contact','dropOff'];
  constructor(private matdialog: MatDialog, private dataservice: DataServicesService) {

  }
  pickUpData: any = this.dataservice.get('pickUp', 'local') || []

  close() {
    this.matdialog.closeAll()
  }
}
