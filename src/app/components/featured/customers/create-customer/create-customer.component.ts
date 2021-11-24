import { Component, OnInit } from '@angular/core';
import { Cloth } from 'src/app/entities/cloth.entity';
import { CustomerBuilder } from 'src/app/entities/customer.entity';
import { Payment } from 'src/app/entities/payment.entity';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  providers: [CustomerService]
})
export class CreateCustomerComponent implements OnInit {

    customers: any = []

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

 

  createNewCustomer(){
      
    let customer = new CustomerBuilder('mark Olivia', 5625663, 'male')

    .setAdress('21, kapcom')

    .setDateRegistered(new Date().toUTCString())

    .setCloth([new Cloth('jenkins bobcat jacket','green', 'jacket', false, 'in progress', new Date().toUTCString(), new Payment())])

    .build()
     
      this.customerService.createCustomer(customer).subscribe( res => console.log(customer))
  }

  


}
