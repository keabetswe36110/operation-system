import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-accomodation-table',
  templateUrl: './accomodation-table.component.html',
  styleUrls: ['./accomodation-table.component.scss']
})
export class AccomodationTableComponent {
  displayedColumns: string[] = ['$implicit', 'index', 'edit', 'numberOfDays','contact'];
  constructor(private matdialog: MatDialog, private dataservice: DataServicesService) {

  }
  accomodationData: any = this.dataservice.get('accomodation', 'local') || []

  close() {
    this.matdialog.closeAll()
  }

}
