import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-travel-table',
  templateUrl: './travel-table.component.html',
  styleUrls: ['./travel-table.component.scss']
})
export class TravelTableComponent {
  displayedColumns: string[] = ['$implicit', 'index', 'edit', 'numberOfDays','contact'];
  constructor(private matdialog: MatDialog, private dataservice: DataServicesService) {

  }
  travelData: any = this.dataservice.get('travel', 'local') || []

  close() {
    this.matdialog.closeAll()
  }

}
