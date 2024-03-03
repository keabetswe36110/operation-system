import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataServicesService } from 'src/app/services/data-services.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  currentEmployee: any = {}

  messaegs: any = []
  localMessages: any = {};
  sendMessages: any = {}
  myMassages: any = []
  isReply: boolean = false;
  isRead: boolean = true;
  constructor(private dataService: DataServicesService, @Inject(MAT_DIALOG_DATA) public data: any, private matdialog: MatDialog) {
    const employeeDetails: any = this.dataService.get('currentUser', 'session');
    const messageDetails: any = this.dataService.get('messages', 'local') || [];

    this.localMessages = messageDetails;
    console.log(this.localMessages);

    this.currentEmployee = employeeDetails;

    this.sendMessages.messageId = this.currentEmployee[0].email
    this.sendMessages.messageName = this.currentEmployee[0].firstName

    this.localMessages.map((item: any) => {
      if (item.sendTo === this.currentEmployee[0].email) {
        this.myMassages.push(item)
      }
    }
    )
    // console.log('new array',this.myMassages)



    if (data === 'readMe') {
      this.isRead = false
    } else {
      this.isRead = true
    }



  }


  displayedColumns: string[] = ['position', 'name', 'weight', 'reply'];
  dataSource = new MatTableDataSource(this.localMessages[0]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  sendMessage() {

    this.messaegs = this.localMessages;
    console.log(this.messaegs)
    if (this.messaegs.length > 0) {
      this.messaegs.push(this.sendMessages)
      this.dataService.addToLocal('messages', this.messaegs)
    } else {
      console.log('form information', this.sendMessages);
      this.messaegs.push(this.sendMessages)
      this.dataService.addToLocal('messages', this.messaegs)
    }
    this.close();


  }
  Change() {
    this.isReply = true
  }
  reply() {
    this.messaegs = this.localMessages;
    let replied = this.messaegs.find((item: { sendTo: any; }) => item.sendTo === this.currentEmployee[0].email)
    console.log(replied)
    replied.sendTo = replied.messageId;
    replied.message = this.sendMessages.reply
    console.log(replied)

    if (this.messaegs.length > 0) {
      this.dataService.addToLocal('messages', this.messaegs);
    } else {
      this.dataService.addToLocal('messages', this.messaegs)
    }
    this.close();
  }

  close(): void {
    this.matdialog.closeAll()
  }
}
