import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.scss']
})
export class FlightTableComponent {
  displayedColumns: string[] = ['$implicit', 'index', 'edit', 'numberOfDays','contact'];
  constructor(private matdialog: MatDialog, private dataservice: DataServicesService) {

  }
  flightData: any = this.dataservice.get('flight', 'local') || []

  close() {
    this.matdialog.closeAll()
  }

}
