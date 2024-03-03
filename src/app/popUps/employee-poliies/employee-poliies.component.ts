import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServicesService } from 'src/app/services/data-services.service';
import { PolicyFormComponent } from '../policy-form/policy-form.component';
import { PolicyDetailsComponent } from '../policy-details/policy-details.component';
import { LeaveFormComponent } from '../leave-form/leave-form.component';

@Component({
  selector: 'app-employee-poliies',
  templateUrl: './employee-poliies.component.html',
  styleUrls: ['./employee-poliies.component.scss']
})
export class EmployeePoliiesComponent {
  constructor(private matdialog: MatDialog, private snackbar:MatSnackBar, private dataService:DataServicesService) { }

  displayedColumns: string[] = ['$implicit', 'index','form'];
  dataaaa:any[] = this.dataService.get('policies', 'local') || [];
  
  
  ShowPolicy(policy: any): void{
    this.matdialog.open(PolicyDetailsComponent, {
      data: policy
    })

  }
  close(): void {
    this.matdialog.closeAll()
  }
  leaveForm(received:any) : void{
    this.matdialog.open(LeaveFormComponent,{data:received})
  }

}
