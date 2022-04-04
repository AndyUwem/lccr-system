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


import { PaymentsModule } from '../payments/payments.moudle';
import { ClothsModule } from '../cloths/cloths.module';
import { FeaturedModule } from '../featured.module';
import { CustomPipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    CustomersComponent, 
    CustomerComponent,
    CreateCustomerComponent
    
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
    ClothsModule,
    CustomPipesModule
  ],
  exports: [CustomersComponent,
     CustomerComponent,
     CreateCustomerComponent ],
})
export class CustomersModule {}
