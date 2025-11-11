import { Routes } from '@angular/router';
import { UserLayoutComponent } from './core/layouts/user-layout/user-layout.component';
import { HomeComponent } from './features/home/home.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { InformationNoteComponent } from './features/information-note/information-note.component';
import { SectorsComponent } from './features/sectors/sectors.component';
import { ActivityLogComponent } from './features/activity-log/activity-log.component';
import { DisplayDataComponent } from './features/display-data/display-data.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'الصفحة الرئيسية' },
      {
        path: 'informative-note',
        component: InformationNoteComponent,
        title: 'النوتة التعريفية',
      },
      { path: 'sectors', component: SectorsComponent, title: 'القطاعات' },
      { path: 'data', component: DisplayDataComponent, title: 'رسوم بيانيه' },
      {
        path: 'activity',
        component: ActivityLogComponent,
        title: 'سجل النشاط',
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];
