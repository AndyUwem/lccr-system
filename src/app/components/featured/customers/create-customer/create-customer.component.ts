import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { CustomerBuilder } from 'src/app/entities/customer.entity';
import { Payment } from 'src/app/entities/payment.entity';
import { Cloth } from 'src/app/interface/cloth.interface';

import { CustomerService } from 'src/app/service/customers.service';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  providers: [CustomerService]
})

export class CreateCustomerComponent implements OnInit {


  isClothsEmpty = true;

  newCustomerForm = new FormGroup({});

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm()

  }

  initializeForm(): void {
    this.newCustomerForm = this.fb.group({
      names: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      registeredDate: [new Date().toUTCString()],
      cloths: this.fb.array([]),
      payment: this.fb.group({
        amountPaid: ['', Validators.required],
        balanceOfPayment: ['', Validators.required],
        date: [new Date().toUTCString()],
        totalPayment: ['', Validators.required]
      })

    })
  }

  handleNewCloths(): void {
    let cloth = this.fb.group({
      clothName: ['', Validators.required],
      clothColor: ['', Validators.required],
      clothCategory: ['', Validators.required],
      serviceType: ['', Validators.required],
      deliveryStatus: ['', Validators.required],
      clothStatus: ['', Validators.required],
      description: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      cost: ['', Validators.required]

    });

    (this.newCustomerForm.get('cloths') as FormArray).push(cloth)
    this.onIsClothsArrayEmpty()

  }



  get cloths(): FormArray { return (this.newCustomerForm.get('cloths') as FormArray) };

  get names(): FormControl { return this.newCustomerForm.get('names') as FormControl };

  get phone(): FormControl { return this.newCustomerForm.get('phone') as FormControl };

  get address(): FormControl { return this.newCustomerForm.get('address') as FormControl };

  get gender(): FormControl { return this.newCustomerForm.get('gender') as FormControl };

  get registeredDate() { return this.newCustomerForm.get('registeredDate') as FormControl };

  get payment(): FormGroup { return this.newCustomerForm.get('payment') as FormGroup };

  get customerCloths(): Array<Cloth> {
    let customerCloths: Array<Cloth> = []
    this.cloths.controls.forEach((cloth) => customerCloths.push(cloth.value))
    return customerCloths
  }


  removeCloth(index: number): void { this.cloths.removeAt(index) }

  setValidationFor(formControl: string) {
    return (this.newCustomerForm.get(formControl)?.invalid &&
      (this.newCustomerForm.get(formControl)?.dirty || this.newCustomerForm.get(formControl)?.touched))
  }

  onIsClothsArrayEmpty(): void {
    this.isClothsEmpty = this.customerCloths.length < 1 ? true : false;
  }

  get newPayment(): Payment {

    const newPayment = new Payment()
          newPayment.setAmountPaid(parseInt(this.payment.get('amountPaid')?.value))
          newPayment.setBalanceOfPayment(parseInt(this.payment.get('balanceOfPayment')?.value))
          newPayment.setDate(this.payment.get('date')?.value)
          newPayment.setTotalPayment(parseInt(this.payment.get('totalPayment')?.value))

    return newPayment
  }


  createNewCustomer(): void {

    let customer = new CustomerBuilder()

      .setNames(this.names?.value)

      .setPhone(this.phone?.value)

      .setGender(this.gender?.value)

      .setAdress(this.address?.value)

      .setDateRegistered(this.registeredDate?.value)

      .setCloth(this.customerCloths)

      .setPayments([this.newPayment])

      .build()

    this.customerService.createCustomer(customer).subscribe(() => { })
  }

  onSubmit(): void {
    if (this.newCustomerForm.valid) { this.createNewCustomer() }
  }

  done(): void {
    this.router.navigateByUrl('/customers')
  }


}
