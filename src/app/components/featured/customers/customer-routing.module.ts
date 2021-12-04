import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateCustomerComponent } from "./create-customer/create-customer.component";
import { CustomerComponent } from "./customer/customer.component";
import { CustomersComponent } from "./customers.component";


const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,

    children: [
      { path: '', component: CustomerComponent },
      { path: 'create-customer', component: CreateCustomerComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class CustomerRoutingModule { }