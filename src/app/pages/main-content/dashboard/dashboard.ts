import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";

@Component({
  selector: 'app-dashboard',
  imports: [ DashboardHeader],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
