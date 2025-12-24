export interface SideBarData {
  label:string;
  sub_menu?:SideBarData[];
  icon?:string;
  route?:string
  heading:boolean;
}
