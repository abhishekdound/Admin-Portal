import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardHeader } from '../../portal-layout/dashboard-header/dashboard-header/dashboard-header';
import { ChatMessage } from '../../../interface/ChatMessage.interface.constant';
import { User } from '../../../interface/user-data.interface';
import { UsersTable } from '../users-table/users-table';
import { UserMessage } from '../../enum/userMessage.enum';
import { UserEnum } from '../../enum/user-enum';
import { UserChats } from '../../../interface/userChats.interface';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHeader, FormsModule, UsersTable],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  chats: UserChats = {};
  users: User[] = [];

  selectedChatUser!: User;
  currentMessages: ChatMessage[] = [];
  newMessage = '';

  ngOnInit() {
    const usersData = localStorage.getItem(UserEnum.UserData);
    this.users = usersData ? JSON.parse(usersData) : [];

    const savedChats = localStorage.getItem(UserMessage.User_Message);
    this.chats = savedChats ? JSON.parse(savedChats) : {};

    this.users.forEach((user) => {
      if (!this.chats[user.id]) {
        this.chats[user.id] = [];
      }
    });

    this.persistChats();

    if (this.users.length) {
      this.openChat(this.users[0]);
    }
  }

  openChat(user: User) {
    this.selectedChatUser = user;
    this.currentMessages = this.chats[user.id] || [];
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedChatUser) return;

    const msg: ChatMessage = {
      userId: this.selectedChatUser.id,
      sender: 'me',
      message: this.newMessage,
      time: new Date().toLocaleTimeString(),
    };

    this.chats[this.selectedChatUser.id].push(msg);
    this.persistChats();

    this.newMessage = '';
    setTimeout(() => this.scrollBottom());
  }

  private persistChats() {
    localStorage.setItem(UserMessage.User_Message, JSON.stringify(this.chats));
  }

  private scrollBottom() {
    const el = document.querySelector('.direct-chat-messages');
    el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }
}
