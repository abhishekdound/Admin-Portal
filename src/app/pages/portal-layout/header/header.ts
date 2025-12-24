import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sideBarToggle(){
    document.body.classList.toggle('sidebar-collapse');
    document.body.classList.toggle('sidebar-open');
  }

}
