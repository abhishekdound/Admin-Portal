import { Injectable } from '@angular/core';
import { UserEnum } from '../../../enum/user-enum';
import { User } from '../../../../interface/user-data.interface';
import { UsersData } from '../../../../constants/user-data.constants';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  getUsers(): User[] {
    const data = localStorage.getItem(UserEnum.UserData);
    return data ? JSON.parse(data) : UsersData;
  }

  saveUsers(users: User[]): void {
    localStorage.setItem(UserEnum.UserData, JSON.stringify(users));
  }

  clear(): void {
    localStorage.removeItem(UserEnum.UserData);
  }
}
