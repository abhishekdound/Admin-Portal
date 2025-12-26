import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',redirectTo:'app',pathMatch:'full'},
  {path:'app',loadComponent:()=>import('./pages/portal-layout/portal-layout').then((c)=>c.PortalLayout),
    children:[
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      {path:'dashboard',loadComponent:()=>import('./pages/main-content/dashboard/dashboard').then((c)=>c.Dashboard)},
      {path:'users',loadComponent:()=>import('./pages/main-content/users/users').then(c=>c.Users)}
    ]
  }
];
