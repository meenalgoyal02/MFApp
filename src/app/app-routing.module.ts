import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerComponent } from './Customer/list-customer/list-customer.component';
import { EmiDetailComponent } from './Emi/emi-detail/emi-detail.component';
import { AddCustomerComponent } from './Customer/add-customer/add-customer.component';
import { DetailCustomerComponent } from './Customer/detail-customer/detail-customer.component';


const routes: Routes = [
  {path:'customers',component:ListCustomerComponent},
  {path:'customers/AddNew',component:AddCustomerComponent},
  {path:'customers/:customerId',component:DetailCustomerComponent},
  {path:'customers/:customerId/EmiDetails',component:EmiDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
