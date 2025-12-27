import { Component, signal } from '@angular/core';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { User } from '../../../interface/user-data.interface';
import { UsersData } from '../../../constants/user-data.constants';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SortType } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-users',
  imports: [DashboardHeader,NgxDatatableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  userData=signal<User[]>(UsersData);
  
  sortType = SortType.multi;

  columns = [
  { prop: 'id' },
  { prop: 'name' },
  { prop: 'age' },
  { prop: 'gender' },
  { prop: 'mail' }
];

}
