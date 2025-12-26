import { SideBarData } from "../interface/side-bar.interface";

export const DetailData:SideBarData[]=[{
  label:'Dashboard',
  icon:'fa-solid fa-house',
  route:'dashboard',
  heading:false


},{
  label:'Data2',
  icon:'bi bi-grip-horizontal',
  sub_menu:[
    {
    label:'Data3',
    icon:'bi bi-grip-horizontal',
    route:'nooo',
    heading:false

    },
    {
      
    label:'Data4',
    icon:'bi bi-grip-horizontal',
    route:'noo',
    heading:false
    }
  ],
  heading:false
},
{
  label:'Users',
  heading:false,
  icon:"fa-solid fa-door-closed",
  route:'users'
}]