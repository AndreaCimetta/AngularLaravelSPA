import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { JWT_OPTIONS, JwtModule } from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import { DashboardComponent } from './dashboard/dashboard.component';
import {SimpleLayoutComponent} from "./theme/containers/simple-layout/simple-layout.component";
import {FullLayoutComponent} from "./theme/containers/full-layout/full-layout.component";
import {ReactiveFormsModule} from "@angular/forms";
import { DetailComponent } from './dashboard/detail/detail.component';
import {SidebarModule} from "primeng/sidebar"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  export function tokenGetter() {
    return JSON.parse(localStorage.getItem("access_token"));
  }


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    SimpleLayoutComponent,
    FullLayoutComponent,
    DetailComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:  environment.whitelistedDomains,
        disallowedRoutes: environment.blacklistedRoutes,
      },
    }),
    ReactiveFormsModule,
    SidebarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
