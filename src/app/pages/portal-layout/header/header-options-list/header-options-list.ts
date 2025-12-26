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
    if(this.forNoti()){
      this.checkNoti();
    }
    if(this.forUser()){
      this.checkUser();
    }
    this.forMessage.update(x=>!x);
  }
  checkNoti(){
    if(this.forMessage()){
      this.checkMessage();
    }
    if(this.forUser()){
      this.checkUser();
    }
    this.forNoti.update(x=>!x);
  }
  checkUser(){
    if(this.forNoti()){
      this.checkNoti();
    }
    if(this.forMessage()){
      this.checkMessage();
    }
    this.forUser.update(x=>!x);
  }

}
