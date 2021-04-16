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
import { DetailComponent } from './userlist/detail/detail.component';
import {SidebarModule} from "primeng/sidebar"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from "primeng/calendar";
import {FileUploadModule} from "primeng/fileupload";
import {ImageCropperModule} from "ngx-image-cropper";
import {DialogModule} from "primeng/dialog";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { UserlistComponent } from './userlist/userlist.component';
import { SlideMenuModule} from "primeng/slidemenu";
import {TieredMenuModule} from "primeng/tieredmenu";
import {ListboxModule} from "primeng/listbox";
import { PostlistComponent } from './postlist/postlist.component';


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
    DetailComponent,
    UserlistComponent,
    PostlistComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.whitelistedDomains,
        disallowedRoutes: environment.blacklistedRoutes,
      },
    }),
    ReactiveFormsModule,
    SidebarModule,
    BrowserAnimationsModule,
    CalendarModule,
    FileUploadModule,
    ImageCropperModule,
    DialogModule,
    BreadcrumbModule,
    TableModule,
    ToolbarModule,
    TieredMenuModule,
    ListboxModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
