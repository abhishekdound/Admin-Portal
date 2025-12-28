import { Component, signal, ViewChild, viewChild } from '@angular/core';
import { DashboardHeader } from "../../portal-layout/dashboard-header/dashboard-header/dashboard-header";
import { User } from '../../../interface/user-data.interface';
import { UsersData } from '../../../constants/user-data.constants';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SortType } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-users',
  imports: [DashboardHeader,NgxDatatableModule,DatePipe],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  userData=signal<User[]>([]);
  temp=signal<User[]>([]);
  loading=signal<boolean>(false);
  @ViewChild('table') table!: DatatableComponent;
  
  sortType = SortType.multi;

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
  editRow(){

  }
  deleteRow(){

  }

  ngAfterViewInit() {
  setTimeout(() => this.table.recalculate(), 0);
}

}
