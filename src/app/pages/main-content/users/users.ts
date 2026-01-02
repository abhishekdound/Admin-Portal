import { ChangeDetectorRef, Component, NgModule, signal, TemplateRef, ViewChild } from '@angular/core';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { User } from '../../../interface/user-data.interface';
import { UsersData } from '../../../constants/user-data.constants';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatColumnDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as XLSX from 'xlsx';




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

 openEdit(row:any){

 }






  deleteRow(row: User) {
  const index = UsersData.findIndex(r => r.id === row.id);
  if (index !== -1) {
    UsersData.splice(index, 1);
  }

  this.userData.set([...UsersData]);

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
    Image_URL: this.makeAbsoluteUrl(u.image) // 👈 IMAGE AS URL
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  /* make Image_URL column clickable */
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

/* convert relative path → absolute URL */
makeAbsoluteUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${window.location}/${path}`;
}



}
