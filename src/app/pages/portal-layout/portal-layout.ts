import { Component } from '@angular/core';
import { Header } from "./header/header";
import { SideBar } from "./side-bar/side-bar";
import { RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-portal-layout',
  imports: [Header, SideBar, RouterOutlet, Footer],
  templateUrl: './portal-layout.html',
  styleUrl: './portal-layout.scss',
})
export class PortalLayout {

}
