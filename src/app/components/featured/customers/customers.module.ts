import { NgModule } from '@angular/core';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers.component';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomersComponent, CustomerComponent,CreateCustomerComponent ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
   ],
  exports: [CustomersComponent, CustomerComponent,CreateCustomerComponent ],
})
export class CustomersModule {}
