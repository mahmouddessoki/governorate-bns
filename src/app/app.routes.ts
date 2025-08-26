import { Routes } from '@angular/router';
import { UserLayoutComponent } from './core/layouts/user-layout/user-layout.component';
import { HomeComponent } from './features/home/home.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './features/authentication/components/login/login.component';

export const routes: Routes = [
  {
    path:'',
    component:UserLayoutComponent,
    children:[
      {path:'home',component:HomeComponent,title:'Home'},
      {path:'',redirectTo:'home',pathMatch:'full'}
    ]
  },
   {
    path:'',
    component:AuthLayoutComponent,
    children:[
      {path:'login',component:LoginComponent,title:'Login'},
      {path:'',redirectTo:'login',pathMatch:'full'}
    ]
  }
,
  
 




];
