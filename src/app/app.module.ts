import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ApiService } from './api.service';
import { CountryComponent } from './country/country.component';
import { CustomerComponent } from './customer/customer.component';
import { FileuploadComponent } from './fileupload/fileupload.component';


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    CustomerComponent,
    FileuploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe, ApiService,  Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
