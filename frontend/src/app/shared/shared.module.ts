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
  ],
  exports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    StorageService,
    ]
})
export class SharedModule { }
