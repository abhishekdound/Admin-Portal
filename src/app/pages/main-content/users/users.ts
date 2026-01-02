import { ChangeDetectorRef, Component, NgModule, signal, TemplateRef, ViewChild } from '@angular/core';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { User } from '../../../interface/user-data.interface';
import { UsersData } from '../../../constants/user-data.constants';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatColumnDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';




@Component({
  selector: 'app-users',
  imports: [DashboardHeader,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,DatePipe,FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  userData=signal<User[]>([]);
  temp=signal<User[]>([]);
  loading=signal<boolean>(false);
  dataSource = new MatTableDataSource<User>();
  displayedColumns:string[]= [
  'avatar',
  'name',
  'age',
  'genderDob',
  'mail',
  'action'
];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
  


  modalType: 'Add' | 'Edit' = 'Add';
selectedUser!: User;


imagePreview: string | null = null;
imageError = '';

 ngOnInit(){
  this.dataSource.data = UsersData;
 }
 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

checkSearchBar(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.dataSource.filter = value.trim().toLowerCase();
}
 getUserData(){
  try{this.userData.set(UsersData);
  this.temp.set(this.userData());
  this.loading.set(true);}
  catch(e){
    console.log(e);
  }
  finally{
    this.loading.set(false);
  }



 }

 openEdit(row:any){

 }






  deleteRow(row: User) {
  const index = UsersData.findIndex(r => r.id === row.id);
  if (index !== -1) {
    UsersData.splice(index, 1);
  }

  this.userData.set([...UsersData]);
  this.temp.set([...UsersData]);

}


  

  downloadInExcel() {
  const rows = this.temp();
  if (!rows.length) return;

  const headers = ['Name', 'Age', 'Gender', 'DOB', 'Email'];

  const csvRows = [
    headers.join(','),

    ...rows.map(user =>
      [
        user.name,
        user.age,
        user.gender,
        user.dob
          ? new Date(user.dob).toLocaleDateString('en-GB')
          : '',
        user.mail
      ].map(v => `"${v}"`).join(',')
    )
  ];

  const blob = new Blob([csvRows.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'users.csv';
  link.click();
}


}
