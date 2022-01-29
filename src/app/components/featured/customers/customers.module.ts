import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { MatStepperModule } from '@angular/material/stepper';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers.component';

import { FilterCustomer } from 'src/app/filter-customer.pipe';
import { PaymentsModule } from '../payments/payments.moudle';
import { ClothsModule } from '../cloths/cloths.module';
import { FeaturedModule } from '../featured.module';


@NgModule({
  declarations: [
    CustomersComponent, 
    CustomerComponent,
    CreateCustomerComponent,
    FilterCustomer
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    ScrollingModule,
    FeaturedModule,
    CustomerRoutingModule,
    PaymentsModule,
    ClothsModule
  ],
  exports: [CustomersComponent,
     CustomerComponent,
     CreateCustomerComponent ],
})
export class CustomersModule {}
