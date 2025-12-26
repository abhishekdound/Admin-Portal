import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-dashboard-header',
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.scss',
})
export class DashboardHeader {

  currentRoute=input.required<string>({
    alias:'this'
  });
  

}
