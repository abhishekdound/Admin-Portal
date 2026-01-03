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
  chartView: [number, number] = [600, 300];
  users: User[] = [];
  genderChartData: any[] = [];

  ageChartData: any[] = [];

  colorScheme: any = {
  domain: ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444']
};



  constructor(private userStorage: UserStorageService) {}

  ngOnInit() {
    this.updateChartView();
    window.addEventListener('resize', this.updateChartView.bind(this));

    const observer = new MutationObserver(() => {
      setTimeout(() => this.updateChartView(), 300); // wait for animation
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    this.users = this.userStorage.getUsers();

    console.log('Users loaded:', this.users); // 👈 ADD THIS

    this.prepareGenderChart();

    this.prepareAgeChart();
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

  private prepareAgeChart() {
    const age = (u: User) => u.age;

    this.ageChartData = [
      { name: '18–22', value: this.users.filter((u) => age(u) >= 18 && age(u) <= 22).length },
      { name: '23–27', value: this.users.filter((u) => age(u) >= 23 && age(u) <= 27).length },
      { name: '28–35', value: this.users.filter((u) => age(u) >= 28 && age(u) <= 35).length },
      { name: '36+', value: this.users.filter((u) => age(u) >= 36).length },
    ];
  }
  updateChartView() {
    const width = window.innerWidth;

    if (width > 1600) {
      this.chartView = [520, 300];
    } else if (width > 1200) {
      this.chartView = [480, 300];
    } else {
      this.chartView = [420, 300];
    }
  }
}
