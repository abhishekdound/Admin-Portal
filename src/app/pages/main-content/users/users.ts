import {  Component,  signal,  ViewChild } from '@angular/core';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { User } from '../../../interface/user-data.interface';
import { UsersData } from '../../../constants/user-data.constants';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogue } from './user-dialogue/user-dialogue';




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
constructor(private dialog: MatDialog) {}

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







  deleteRow(row: User) {
  const updatedData = this.dataSource.data.filter(u => u.id !== row.id);

  this.dataSource.data = updatedData; 
}


  


downloadInExcel() {
  const data = this.dataSource.filteredData.length
    ? this.dataSource.filteredData
    : this.dataSource.data;

  const excelData = data.map(u => ({
    ID: u.id,
    Name: u.name,
    DOB: u.dob,
    Age: u.age,
    Gender: u.gender,
    Email: u.mail,
    Image_URL: this.makeAbsoluteUrl(u.image) // 
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const range = XLSX.utils.decode_range(worksheet['!ref']!);
  for (let r = 1; r <= range.e.r; r++) {
    const cellAddress = XLSX.utils.encode_cell({ r, c: 6 }); // column index
    const cell = worksheet[cellAddress];
    if (cell?.v) {
      cell.l = { Target: cell.v };
    }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

  XLSX.writeFile(workbook, 'users.xlsx');
}

makeAbsoluteUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${window.location}/${path}`;
}

    openUserModal(user?: User) {
  const dialogRef = this.dialog.open(UserDialogue, {
    width: '400px',
    data: user ? { ...user } : null
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    if (user) {
      this.dataSource.data = this.dataSource.data.map(u =>
        u.id === result.id ? result : u
      );
    } else {
      this.dataSource.data = [
        ...this.dataSource.data,
        { ...result, id: Date.now() }
      ];
    }
  });
}



}
