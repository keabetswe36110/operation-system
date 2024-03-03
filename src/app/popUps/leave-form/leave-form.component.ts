import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PolicyFormComponent } from '../policy-form/policy-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataServicesService } from 'src/app/services/data-services.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent {

  isUpdate: boolean = false
  leaves: any = [];
  existingLeaves: any = [];
  showDisabled: boolean = false;
  minDate: any; // Holds the minimum date value


  constructor(private dataService: DataServicesService, @Inject(MAT_DIALOG_DATA) public data: any ,
  private matdialogRef:MatDialogRef<LeaveFormComponent>,
  private snackbar:MatSnackBar) {

    console.log(data)
    if (data) {
      this.leaveFormData = data
      this.leaveFormData = { ...this.leaveFormData, type: data.category, status: 'Pending' }
      this.isUpdate = false;
      this.showDisabled = true

      if (this.currentEmployee[0].role.toLowerCase() === 'manager')
        this.isUpdate = true;
      this.showDisabled = false;
    }

    // Initialize minDate with today's date
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }
  currentEmployee = this.dataService.get('currentUser', 'session');

  leaveFormData: any = {
    status: 'pending',
    fullNames: 'done',
    
  };
  leaveStatus = ['Pending', 'Approved', 'Rejected'];
  leaveType: any = ['Annual', 'Sick', 'Family'];

  submit(): void {
    this.leaveFormData = {...this.leaveFormData, id: new Date().getTime() ,email : this.currentEmployee[0].email}

    console.log(this.currentEmployee)
    if (this.leaveFormData.type === 'annual') {
      console.log(this.leaveFormData.daysNo)
      this.currentEmployee[0].annualLeaves = (this.currentEmployee[0].annualLeaves - this.leaveFormData.daysNo)
      console.log(this.currentEmployee[0].annualLeaves)
    }

    this.existingLeaves = this.dataService.get('leave', 'local') || [];
    if (this.showDisabled) {
      console.log('helo world')
      this.leaveFormData = this.leaveFormData.filter((item: any) => item.status !== 'pending')
      console.log(this.leaveFormData);
      return
    }

    if (this.existingLeaves.length > 0) {
      this.leaves = this.existingLeaves;
      this.leaves.push(this.leaveFormData)
      this.dataService.addToLocal('leave', this.leaves)
    } else {
      this.leaves.push(this.leaveFormData)
      this.dataService.addToLocal('leave', this.leaves)
    }
    this.snackbar.open("leave form has been submitted successfully..","OK")
    this.matdialogRef.close();
    
  }

  update(): void {
    console.log(this.leaveFormData.id)
    const allLeaves = this.dataService.get('leave', 'local');
    console.log(allLeaves)
    allLeaves.forEach(((leave: any) => {
      if (leave.id === this.leaveFormData.id) {
        leave.status = this.leaveFormData.status.toUpperCase() === 'APPROVED' ? 'Approved' : 'rejected',
          this.dataService.addToLocal('leave', allLeaves);
      }
    }))
  }



  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;

  };

  close(){
    this.matdialogRef.close()
  }
}
