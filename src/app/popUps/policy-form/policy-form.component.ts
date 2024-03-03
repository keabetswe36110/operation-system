import { formatDate } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent {

  isUpdate:boolean = false;

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<PolicyFormComponent>, private snackbar: MatSnackBar,
    private dataService: DataServicesService,@Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
      if(data){
        this.isUpdate = true
        this.policyFormData=data;
      }
  }
  // policyFormData: any = this.data
  allPolicies: any = []
  policyFormData:any=
  {
    title: '',
    content: '',
    procedure: '',
    category: '',
    link: ''
  }
  categories: any = ['Annual', 'Sick', 'Family']

  submitPolicy() {


    let existingPolicies: any[] = this.dataService.get('policies', 'local') || [];
    console.log(existingPolicies);
    if (this.isUpdate) {
      existingPolicies = existingPolicies.map((element: any) => {
        if (this.data.id === element.id) {
          return this.policyFormData;
        }else{
          return element
        }
        
      })
    }
    else {  
      this.policyFormData = {
        ...this.policyFormData,
        id: new Date().getTime()
      }
      existingPolicies.push(this.policyFormData)
    }

    this.dataService.addToLocal('policies',existingPolicies);
    // this.allPolicies.push(this.policyFormData)
    // localStorage.setItem('policies',JSON.stringify(this.allPolicies))

    // if (existingPolicies.find((policy: any) => policy.title.toUpperCase() === this.policyFormData.title.toUpperCase())) {
    //   this.snackbar.open('Policy aready exists, please add a different policy', 'Ok', { duration: 6000 })
    //   this.dialogRef.close()
    // } else {

    //   let _users = localStorage.getItem('policies');
    //   const policies = _users ? JSON.parse(_users) : []

    //   if (policies.length < 1) {
    //     this.allPolicies.push(this.policyFormData)
    //     localStorage.setItem('policies', JSON.stringify(this.allPolicies));
    //     this.close('policy added successfully')
    //   }
    //   else {
    //     const localdata: any[] = policies;
    //     // console.log(localdata)
    //     localdata.push(this.policyFormData)
    //     localStorage.setItem('policies', JSON.stringify(localdata))
    //     this.close('policy added successfully')
    //   }

    // }
    this.close('policy added successfully')
  }
  close(message: string = ''): void {
    this.dialogRef.close(message)
  }

}
