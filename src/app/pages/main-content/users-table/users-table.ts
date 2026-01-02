import { Component, ViewChild } from '@angular/core';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { User } from '../../../interface/user-data.interface';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { UserStorageService } from '../users/user-storage-service/user-storage-service';
import { UserDialogue } from '../users/user-dialogue/user-dialogue';

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,DatePipe,FormsModule],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
})
export class UsersTable {
  
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
constructor(private dialog: MatDialog,private storage: UserStorageService) {}

 ngOnInit(){
  
  this.dataSource = new MatTableDataSource(this.storage.getUsers());
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
  this.storage.saveUsers(updatedData);
  
  this.dataSource.paginator?.firstPage();
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
    Image_URL: this.makeAbsoluteUrl(u.image) 
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const imageColIndex = Object.keys(excelData[0]).length - 1;

  const range = XLSX.utils.decode_range(worksheet['!ref']!);
  for (let r = 1; r <= range.e.r; r++) {
    const cellAddress = XLSX.utils.encode_cell({ r, c: imageColIndex });
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
  return `${window.location.origin}/${path}`;
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
      const updated=this.dataSource.data ;
      this.storage.saveUsers(updated); 
      
  this.dataSource.paginator?.firstPage();
  });
}

  resetUsers() {
  this.storage.clear();
  this.dataSource.data = this.storage.getUsers();
  
  this.dataSource.paginator?.firstPage();
}

}
