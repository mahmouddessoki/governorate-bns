import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { userGuard } from './core/guards/user/user.guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './core/layouts/user-layout/user-layout.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { InformationNoteComponent } from './features/information-note/information-note.component';
import { SectorsComponent } from './features/sectors/sectors.component';
import { ActivityLogComponent } from './features/activity-log/activity-log.component';
import { DisplayDataComponent } from './features/display-data/display-data.component';
import { getSectorsResolver } from './features/sectors/resolver/get-sectors.resolver';
import { LocalUnitsComponent } from './features/local-units/local-units.component';
import { GovernoratesComponent } from './features/governorates/governorates.component';
import { getGovsResolver } from './features/governorates/resolver/get-govs.resolver';
import { CentersComponent } from './features/centers/centers.component';
import { getCentersResolver } from './features/centers/resolver/get-centers.resolver';
import { getLocalUnitsResolver } from './features/local-units/resolver/get-local-units.resolver';
import { VillagesComponent } from './features/villages/villages.component';
import { getVillagesResolver } from './features/villages/resolver/get-villages.resolver';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SubSectorComponent } from './features/sub-sector/sub-sector.component';
import { getSUbSectorsResolver } from './features/sub-sector/resolver/get-sub-sectors.resolver';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'تسجيل الدخول',
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [userGuard],
    children: [
      { path: 'home', component: HomeComponent, title: ' الرئيسية' },
      {
        path: 'informative-note',
        component: InformationNoteComponent,
        title: 'النوتة التعريفية',
      },
      // { path: 'data', component: DisplayDataComponent, title: 'رسوم بيانيه' },
      {
        path: 'activity',
        component: ActivityLogComponent,
        title: 'سجل النشاط',
      },
      {
        path: 'sectors',
        component: SectorsComponent,
        title: 'القطاعات',
        resolve: {
          sectors: getSectorsResolver,
        },
      },
      {
        path: 'governorates',
        component: GovernoratesComponent,
        title: 'المحافظه',
        resolve: {
          gov: getGovsResolver,
        },
      },

      {
        path: 'centers',
        component: CentersComponent,
        title: 'المراكز',
        resolve: {
          centers: getCentersResolver,
        },
      },
      {
        path: 'local-units',
        component: LocalUnitsComponent,
        title: 'الوحدات المحليه',
        resolve: {
          localUnits: getLocalUnitsResolver,
        },
      },
      {
        path: 'villages',
        component: VillagesComponent,
        title: 'القرى',
        resolve: {
          villages: getVillagesResolver,
        },
      },
      {
        path: 'sectors/:id',
        component: SubSectorComponent,
        resolve: {
          subSectors: getSUbSectorsResolver,
        },
      },
      {
        path: 'sectors/:id/:subId',
        component: DisplayDataComponent,
        title: 'رسوم بيانيه',
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
