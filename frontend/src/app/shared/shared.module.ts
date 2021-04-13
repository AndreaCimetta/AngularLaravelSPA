import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageService} from './storage.service';

import { HttpClientModule} from '@angular/common/http';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {DataViewModule} from "primeng/dataview";
import {SidebarModule} from 'primeng/sidebar';
import {TableModule} from "primeng/table";
import {FileUpload, FileUploadModule} from "primeng/fileupload";
import {CalendarModule} from "primeng/calendar";
import {ImageCropperModule} from "ngx-image-cropper";
import {DialogModule} from "primeng/dialog";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SidebarModule,
    DataViewModule,
    TableModule,
    FileUploadModule,
    CalendarModule,
    ImageCropperModule,
    DialogModule,

  ],
  exports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    StorageService,
    FileUpload
    ]
})
export class SharedModule { }
