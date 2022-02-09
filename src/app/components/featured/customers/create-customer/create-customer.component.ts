import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerBuilder } from 'src/app/entities/customer.entity';
import { Cloth } from 'src/app/interface/cloth.interface';
import { Payment } from 'src/app/interface/payment.interface';

import { CustomerService } from 'src/app/service/customers/customers.service';
import { AuthService } from '../../accounts/authentication/auth.service';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})

export class CreateCustomerComponent implements OnInit {

  
  public newCustomerForm: FormGroup = new FormGroup({});
  public costPayments: Payment[] = []
  public isShowPaymentSection: boolean = false;
  private newFormPayment!: Payment

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.initializeForm()
  }


  initializeForm(): void {
    this.newCustomerForm = this.fb.group({
      names: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      registeredDate: [{ value: new Date().toUTCString(), disabled: true }],
      cloths: this.fb.array([]),
      payment: this.fb.group({
        amountPaid: ['', Validators.required],
        balanceOfPayment: [''],
        date: [new Date().toUTCString()],
        totalPayment: ['']
      })

    })

  }

  handleNewCloths(): void {
    let cloth = this.fb.group({
      clothName: ['', Validators.required],
      clothColor: ['', Validators.required],
      clothCategory: ['', Validators.required],
      serviceType: ['', Validators.required],
      deliveryStatus: ['Not Delivered'],
      clothStatus: ['In Progress'],
      description: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      clothRegistrationDate: [new Date().toUTCString()],
      cost: ['', Validators.required]
    });

        this.cloths.push(cloth)
  }



  public get f(): {[ key: string ]: AbstractControl} 
     { return this.newCustomerForm.controls; };


  get cloths(): FormArray { return (this.newCustomerForm.get('cloths') as FormArray) };

  get payment(): FormGroup { return this.newCustomerForm.get('payment') as FormGroup };

  public removeCloth(index: number): void { this.cloths.removeAt(index) }
 
  get customerCloths(): Array<Cloth> {
    let customerCloths: Array<Cloth> = []
    this.cloths.controls
    .forEach((cloth) => customerCloths.push(cloth.value))
     return customerCloths
  }

  public get getClothsLength(): boolean {
    return this.customerCloths.length > 0;
  }

  private newPayment(cost: number): Payment {
    const newPayment: Payment = {
      date: new Date().toUTCString(),
      amountPaid: 0,
      balanceOfPayment: cost,
      totalPayment: cost
    }
    return newPayment
  }

  private initializePayments(): void {
    let $cost: number = 0
    this.customerCloths.filter(cloth => $cost += parseInt(cloth.cost))
    this.costPayments.push(this.newPayment($cost))
    this.isShowPaymentSection = true
  }

  public recievedPayment(payment: Payment): void {
    this.newFormPayment = this.setFormPayment = payment
  }


  private createNewCustomer(): void {
    let customer = new CustomerBuilder()
      .setNames(this.f['names'].value)
      .setPhone(this.f['phone'].value)
      .setGender(this.f['gender'].value)
      .setAdress(this.f['address'].value)
      .setDateRegistered(this.f['registeredDate'].value)
      .setCloth(this.customerCloths)
      .setPayments([this.newFormPayment])
      .build()

    this.customerService
     .createCustomer( this.authService.getAdminId, customer)
     .subscribe({
      next: () => console.log('customer was sucessfully registered..'),
      error: (err) => console.log(err.message)
    })
  }



  private set setFormPayment(payment: Payment) {
    this.payment.patchValue({
      amountPaid: payment.amountPaid,
      balanceOfPayment: payment.balanceOfPayment,
      totalPayment: payment.totalPayment,
      date: payment.date
    })
  }

  public get isPaymentValid(): boolean {
    return parseInt(this.payment.get('amountPaid')?.value) > 0 || this.newCustomerForm.valid
  }

  public get isCostValid(): boolean {
    let cost: number = 0
    this.customerCloths.filter(cloth => {
      if (cloth.cost == '' || isNaN(parseInt(cloth.cost)))
        cloth.cost = '0'
      else
        cost = parseInt(cloth.cost)
    })
    return cost < 1
  }

  public proceed(): void {
    this.initializePayments()
  }


  public goBackToCustomerForm(): void {
    this.isShowPaymentSection = false
  }

  onSubmit(): void {
    if (this.newCustomerForm.valid && this.isPaymentValid) { this.createNewCustomer() }
  }

  public done(): void {
    this.router.navigate(['home/customers'])
  }

  public cancelForm(): void {
    this.newCustomerForm.reset()
    this.done()
  }

}
