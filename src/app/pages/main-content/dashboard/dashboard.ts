import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { ChatMessage } from '../../../interface/ChatMessage.interface.constant';
import { User } from '../../../interface/user-data.interface';

@Component({
  selector: 'app-dashboard',
  imports: [ DashboardHeader,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  chatMessages: ChatMessage[] = [
  { userId: 1, sender: 'user', message: 'Hello!', time: '2:00 PM' },
  { userId: 1, sender: 'me', message: 'Hi Amit 👋', time: '2:01 PM' },

  { userId: 2, sender: 'user', message: 'Any update?', time: '3:10 PM' },
];

testUsers: User[] = [
  { id: 1, name: 'Amit', image: 'assets/img/avatar.png' } as User,
  { id: 2, name: 'Neha', image: 'assets/img/avatar.png' } as User
];


  selectedChatUser!: User;
currentMessages: ChatMessage[] = [];
newMessage = '';

openChat(user: User) {
  this.selectedChatUser = user;
  this.currentMessages = this.chatMessages.filter(
    m => m.userId === user.id
  );
}

sendMessage() {
  if (!this.newMessage.trim() || !this.selectedChatUser) return;

  const msg: ChatMessage = {
    userId: this.selectedChatUser.id,
    sender: 'me',
    message: this.newMessage,
    time: new Date().toLocaleTimeString()
  };

  this.chatMessages.push(msg);
  this.currentMessages.push(msg);
  this.newMessage = '';
}





}
