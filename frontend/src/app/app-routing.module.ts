import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullLayoutComponent} from "./theme/containers/full-layout/full-layout.component";
import {GuardService} from "./auth/guard.service";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BeforeLoginService} from "./auth/before-login.service";
import {SimpleLayoutComponent} from "./theme/containers/simple-layout/simple-layout.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {LoginComponent} from "./auth/login/login.component";
import {DetailComponent} from "./userlist/detail/detail.component";
import {UserlistComponent} from "./userlist/userlist.component";
import {PostlistComponent} from "./postlist/postlist.component";
import {SearchComponent} from "./search/search.component";
import {PostDetailComponent} from "./postlist/post-detail/post-detail.component";

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
        path: 'user-list',
        data: {
          breadcrumb: 'User List'
        },
        children: [
          {
            path: '',
            component: UserlistComponent,
            data: {
              breadcrumb: ''
            },
          },
          {
            path: 'detail/:email',
            component: DetailComponent,
            data: {
              breadcrumb: 'User Detail'
            },
          }
        ]
      },

      {
        path: 'post-list',
        data: {
          breadcrumb: 'Post List'
        },
        children: [
          {
            path: '',
            component: PostlistComponent,
            data: {
              breadcrumb: ''
            },
          },
          {
            path: 'post-detail/:id',
            component: PostDetailComponent,
            data: {
              breadcrumb: 'Post Detail'
            },
          }
        ]
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          breadcrumb: 'Search'
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
