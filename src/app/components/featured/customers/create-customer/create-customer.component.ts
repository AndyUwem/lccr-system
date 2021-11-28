import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

   
    form = new FormGroup({});

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm()
  }

 initializeForm(): void{
    this.form = this.fb.group({
        customerNames: ['', Validators.required ],
        phone: ['', Validators.required],
        date: ['', Validators.required],
        gender: ['', Validators.required],

       cloths: this.fb.array([ this.newCloth() ])
  })
}

    addCloths(): void{
      (this.form.get('cloths') as FormArray).push(this.newCloth())
   }


   newCloth(): FormGroup{
       return this.fb.group({
           clothName: ['', Validators.required],
           color: ['', Validators.required],
           clothCategory: [''],
       })
   }


   get bagOfCloths(){
    return (this.form.get('cloths') as FormArray).controls;
   }

  removeCloth(index: any): void{
      (this.form.get('cloths') as FormArray).removeAt(index)
  }


 
  onSubmit(){
      console.log(this.form)
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
