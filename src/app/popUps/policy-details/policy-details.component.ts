import { Component, Inject } from '@angular/core';
import { DataServicesService } from 'src/app/services/data-services.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent {

  constructor(private matDialog: MatDialogRef<PolicyDetailsComponent>, private dataService: DataServicesService, @Inject(MAT_DIALOG_DATA) public data: any){
    console.log(data)
  }

}
