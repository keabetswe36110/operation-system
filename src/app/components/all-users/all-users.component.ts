import { Component ,OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataServicesService } from 'src/app/services/data-services.service';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit{

  constructor(private dataService:DataServicesService){

  }
  _users:any = localStorage.getItem('users');
  users:any= this._users ? JSON.parse(this._users) : []

  ngOnInit(): void {
    let _users = localStorage.getItem('users');
    const users = _users ? JSON.parse(_users) : []
    // console.log("all users here",users)
  }

  refresh(){
    window.location.reload();
  }
 
  displayedColumns: string[] = ['$implicit', 'index', 'count', 'first', 'last', 'even', 'odd'];
  data: string[] = this.users;

  dataSource = new MatTableDataSource(this.data);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(data:any){
    this.users = this.users.filter((item: { email: any; }) => item.email != data.email)
    this.dataService.addToLocal('users',this.users)
  }

}
