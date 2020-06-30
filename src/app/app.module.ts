import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCustomerComponent } from './Customer/add-customer/add-customer.component';
import { DetailCustomerComponent } from './Customer/detail-customer/detail-customer.component';
import { ListCustomerComponent } from './Customer/list-customer/list-customer.component';
import { EmiDetailComponent } from './Emi/emi-detail/emi-detail.component';
import { DateValidatorDirective } from './Helpers/date-validator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { InfoDialogComponent } from './common/info-dialog/info-dialog.component';
import { DeleteCustomerComponent } from './Customer/delete-customer/delete-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    
    DetailCustomerComponent,
    ListCustomerComponent,
    EmiDetailComponent,
    DateValidatorDirective,
    InfoDialogComponent,
    DeleteCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    InfoDialogComponent,
    DeleteCustomerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
