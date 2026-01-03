import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserEnum } from '../../../enum/user-enum';
import { User } from '../../../../interface/user-data.interface';
import { UserStorageService } from '../../users/user-storage-service/user-storage-service';

@Component({
  selector: 'app-user-analytics',
  imports: [NgxChartsModule],
  templateUrl: './user-analytics.html',
  styleUrl: './user-analytics.scss',
})
export class UserAnalytics implements OnInit {
  users: User[] = [];
  genderChartData: any[] = [];

  constructor(private userStorage: UserStorageService) {}

  ngOnInit() {
    this.users = this.userStorage.getUsers();

    console.log('Users loaded:', this.users); // 👈 ADD THIS

    this.prepareGenderChart();
  }

  prepareGenderChart() {
    const male = this.users.filter((u) => u.gender === 'Male').length;
    const female = this.users.filter((u) => u.gender === 'Female').length;

    this.genderChartData = [
      { name: 'Male', value: male },
      { name: 'Female', value: female },
    ];

    console.log('Chart data:', this.genderChartData); // 👈 ADD
  }
}
