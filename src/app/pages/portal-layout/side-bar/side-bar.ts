import { Component, signal } from '@angular/core';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { SideBarData } from '../../../interface/side-bar.interface';
import { DetailData } from '../../../constants/sidebar-data.constants';
import { RouterLink } from "@angular/router";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [OverlayscrollbarsModule, RouterLink, NgClass],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {

  list=signal<SideBarData[]>(DetailData);
  isActive=signal<string|null>(null);
  isActiveChange(item:string){
    this.isActive.update(x=>(x===item)?null:item);
  }

}
