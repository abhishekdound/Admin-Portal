import {  Component } from '@angular/core';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { UsersTable } from '../users-table/users-table';


@Component({
  selector: 'app-users',
  imports: [UsersTable,DashboardHeader],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  


}
