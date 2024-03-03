import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PolicyFormComponent } from 'src/app/popUps/policy-form/policy-form.component';
import { DataServicesService } from 'src/app/services/data-services.service';
import { PolicyDetailsComponent } from 'src/app/popUps/policy-details/policy-details.component';
import { LeaveFormComponent } from 'src/app/popUps/leave-form/leave-form.component';


@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent {

  constructor(private matdialog: MatDialog,
    private snackbar: MatSnackBar, private dataService: DataServicesService) {

  }
  displayedColumns: string[] = ['Name', 'Category', 'edit','delete'];
  dataaaa: any[] = this.dataService.get('policies', 'local') || [];


  editActive: boolean = false;

  AddPolicy() {
    const dialogRef = this.matdialog.open(PolicyFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open(result, 'Ok', { duration: 3000 });
      }
    });
  }
  // ShowPolicy(){
  //   const myDetails = this.matdialog.open(PolicyDetailsComponent)
  //   myDetails.afterClosed().subscribe(result => {
  //     if(result){
  //       this.snackbar.open(result,'OK',{duration:3000})
  //   }


  //     })
  // }

  ShowPolicy(policy: any): void {
    this.matdialog.open(PolicyDetailsComponent, {
      data: policy
    })

  }
  edit(policy: any): void {
    this.matdialog.open(PolicyFormComponent, {
      data: policy
    })
  }

  close(): void {
    this.matdialog.closeAll()
  }
  delete(data:any){
    this.dataaaa = this.dataaaa.filter((item,index) => item.id != data.id)
    this.dataService.addToLocal('policies',this.dataaaa)
  }
}
