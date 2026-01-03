import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardHeader } from '../../portal-layout/dashboard-header/dashboard-header/dashboard-header';
import { ChatMessage } from '../../../interface/ChatMessage.interface.constant';
import { User } from '../../../interface/user-data.interface';
import { UsersTable } from '../users-table/users-table';
import { UserMessage } from '../../enum/userMessage.enum';
import { UserEnum } from '../../enum/user-enum';
import { UserChats } from '../../../interface/userChats.interface';
import { UserAnalytics } from './user-analytics/user-analytics';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHeader, FormsModule, UsersTable,UserAnalytics],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  chats: Record<number, ChatMessage[]> = {};
  users: User[] = [];

  selectedChatUser: User | null = null;
  currentMessages: ChatMessage[] = [];
  newMessage = '';

  ngOnInit() {
  // load users
  const usersData = localStorage.getItem(UserEnum.UserData);
  this.users = usersData ? JSON.parse(usersData) : [];

  // load chats safely
  const savedChats = localStorage.getItem(UserMessage.User_Message);
  this.chats = savedChats ? JSON.parse(savedChats) : {};

  // 🔥 FORCE correct structure
  this.users.forEach(user => {
    if (!Array.isArray(this.chats[user.id])) {
      this.chats[user.id] = [];   // ✅ GUARANTEED ARRAY
    }
  });

  this.persistChats();
}


  // 🔥 CALLED FROM UsersTable
  openChat(user: User) {
  this.selectedChatUser = user;

  // 🔥 safety guard
  if (!Array.isArray(this.chats[user.id])) {
    this.chats[user.id] = [];
    this.persistChats();
  }

  this.currentMessages = [...this.chats[user.id]];
}


  sendMessage() {
  if (!this.selectedChatUser) return;
  if (!this.newMessage.trim()) return;

  const userId = this.selectedChatUser.id;

  // 🔥 GUARANTEE array
  if (!Array.isArray(this.chats[userId])) {
    this.chats[userId] = [];
  }

  const msg: ChatMessage = {
    userId,
    sender: 'me',
    message: this.newMessage,
    time: new Date().toLocaleTimeString()
  };

  this.chats[userId].push(msg);
  this.currentMessages = [...this.chats[userId]];

  this.persistChats();
  this.newMessage = '';
}


  private persistChats() {
    localStorage.setItem(
      UserMessage.User_Message,
      JSON.stringify(this.chats)
    );
  }

  private scrollBottom() {
    const el = document.querySelector('.direct-chat-messages');
    el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }
}

