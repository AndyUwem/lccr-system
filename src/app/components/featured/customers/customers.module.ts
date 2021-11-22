import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers.component';


@NgModule({
  declarations: [CustomersComponent, CustomerComponent ],
  exports: [CustomersComponent, CustomerComponent ],
})
export class CustomersModule {}
