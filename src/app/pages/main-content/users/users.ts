import { Component, NgModule, signal, TemplateRef, ViewChild } from '@angular/core';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { User } from '../../../interface/user-data.interface';
import { UsersData } from '../../../constants/user-data.constants';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SortType } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-users',
  providers:[
    BsModalService
  ],
  imports: [DashboardHeader,NgxDatatableModule,DatePipe,FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  userData=signal<User[]>([]);
  temp=signal<User[]>([]);
  loading=signal<boolean>(false);
  @ViewChild('table') table!: DatatableComponent;
  
  sortType = SortType.multi;

    modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  modalType: 'Add' | 'Edit' = 'Add';
selectedUser!: User;


imagePreview: string | null = null;
imageError = '';

 ngOnInit(){
  this.getUserData();
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

   openModal(template: TemplateRef<any>, row?: User) {
  this.modalType = row ? 'Edit' : 'Add';

  this.selectedUser = row
    ? { ...row }
    : {
        id: Date.now(),
        name: '',
        age: 0,
        gender: 'Male',
        dob: '',
        mail: '',
        image: ''
      };

  this.imagePreview = this.selectedUser.image || null;
  this.imageError = '';

  this.modalRef = this.modalService.show(template);
}

  saveUser(form: any) {
  if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }

  if (this.modalType === 'Add') {
    this.userData.update(users => [...users, this.selectedUser]);
    this.temp.update(users => [...users, this.selectedUser]);
  } else {
    this.userData.update(users =>
      users.map(u => (u.id === this.selectedUser.id ? this.selectedUser : u))
    );
    this.temp.update(users =>
      users.map(u => (u.id === this.selectedUser.id ? this.selectedUser : u))
    );
  }

  this.modalRef?.hide();
}


  onImageSelect(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];

  if (!file.type.startsWith('image/')) {
    this.imageError = 'Only image files allowed';
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
    this.selectedUser.image = this.imagePreview;
  };

  reader.readAsDataURL(file);
}


  checkSearchBar(event:any){
    const value:string=event.target.value as string;
    console.log(event.target.value);
    this.temp.set(this.userData().filter(
      x=>{
        return x.name.toLowerCase().indexOf(value.toLowerCase())!==-1 || x.mail.toLowerCase().indexOf(value.toLowerCase())!==-1 || x.gender.toLowerCase().indexOf(value.toLowerCase())!==-1|| x.dob.toLowerCase().indexOf(value.toLowerCase())!==-1|| x.age.toString().toLowerCase().indexOf(value.toLowerCase())!==-1 ||
        !value
        ;
      }
    ))
    this.table.offset=0;


  }
  deleteRow(row: User) {
  const index = UsersData.findIndex(r => r.id === row.id);
  if (index !== -1) {
    UsersData.splice(index, 1);
  }

  this.userData.set([...UsersData]);
  this.temp.set([...UsersData]);

  this.table.offset = 0;
}


  ngAfterViewInit() {
  setTimeout(() => this.table.recalculate(), 0);
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
