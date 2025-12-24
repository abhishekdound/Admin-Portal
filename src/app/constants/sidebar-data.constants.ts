import { SideBarData } from "../interface/side-bar.interface";

export const DetailData:SideBarData[]=[{
  label:'Data1',
  icon:'bi bi-house',
  route:'dashboard',
  heading:false


},{
  label:'Data2',
  icon:'bi bi-grip-horizontal',
  sub_menu:[
    {
    label:'Data3',
    icon:'bi bi-grip-horizontal',
    route:'dashboard',
    heading:false

    },
    {
      
    label:'Data4',
    icon:'bi bi-grip-horizontal',
    route:'dashboard',
    heading:false
    }
  ],
  heading:false
}]