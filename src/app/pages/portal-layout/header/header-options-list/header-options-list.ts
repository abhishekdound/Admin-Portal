import { NgClass } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-header-options-list',
  imports: [NgClass],
  templateUrl: './header-options-list.html',
  styleUrl: './header-options-list.scss',
})
export class HeaderOptionsList {
  forMessage:WritableSignal<boolean>=signal<boolean>(false);
  forNoti:WritableSignal<boolean>=signal<boolean>(false);
  forUser:WritableSignal<boolean>=signal<boolean>(false);
  checkMessage(){
    this.forMessage.update(x=>!x);
  }
  checkNoti(){
    this.forNoti.update(x=>!x);
  }
  checkUser(){
    this.forUser.update(x=>!x);
  }

}
