import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullLayoutComponent} from "./theme/containers/full-layout/full-layout.component";
import {GuardService} from "./auth/guard.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BeforeLoginService} from "./auth/before-login.service";
import {SimpleLayoutComponent} from "./theme/containers/simple-layout/simple-layout.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {LoginComponent} from "./auth/login/login.component";
import {DetailComponent} from "./dashboard/detail/detail.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [GuardService],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Dashboard'
        },
      },
      {
        path: 'dashboard/detail/:email',
        component: DetailComponent,
        data: {
          breadcrumb: 'User Detail'
        },
      }

    ],
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    canActivate: [BeforeLoginService],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: RegistrationComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
