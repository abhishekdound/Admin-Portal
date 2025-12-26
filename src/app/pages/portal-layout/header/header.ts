import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HeaderOptionsList } from './header-options-list/header-options-list';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,HeaderOptionsList],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sideBarToggle(){
    document.body.classList.toggle('sidebar-collapse');
    document.body.classList.toggle('sidebar-open');
  }

}
