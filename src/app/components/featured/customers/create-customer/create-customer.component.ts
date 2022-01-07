import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerBuilder } from 'src/app/entities/customer.entity';
import { Cloth } from 'src/app/interface/cloth.interface';
import { Payment } from 'src/app/interface/payment.interface';

import { CustomerService } from 'src/app/service/customers/customers.service';


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
    private router: Router) { }

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
      deliveryStatus: ['', Validators.required],
      clothStatus: ['', Validators.required],
      description: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      cost: ['', Validators.required]

    });

    (this.newCustomerForm.get('cloths') as FormArray).push(cloth)
    // this.getClothsLength

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

  get getClothsLength(): boolean {
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

  recievedPayment(payment: Payment): void {
    this.newFormPayment = this.setFormPayment = payment
  }


  private createNewCustomer(): void {
    let customer = new CustomerBuilder()
      .setNames(this.names?.value)
      .setPhone(this.phone?.value)
      .setGender(this.gender?.value)
      .setAdress(this.address?.value)
      .setDateRegistered(this.registeredDate?.value)
      .setCloth(this.customerCloths)
      .setPayments([this.newFormPayment])
      .build()
    this.customerService.createCustomer(customer).subscribe(() => { })
  }



  private set setFormPayment(payment: Payment) {
    this.payment.patchValue({
      amountPaid: payment.amountPaid,
      balanceOfPayment: payment.balanceOfPayment,
      totalPayment: payment.totalPayment,
      date: payment.date
    })
  }

  get isPaymentValid(): boolean {
    return parseInt(this.payment.get('amountPaid')?.value) > 0 || this.newCustomerForm.valid
  }

  get isCostValid(): boolean {
    let cost: number = 0
    this.customerCloths.filter(cloth => {
      if (cloth.cost == '' || isNaN(parseInt(cloth.cost)))
        cloth.cost = '0'
      else
        cost = parseInt(cloth.cost)
    })
    return cost < 1
  }

  proceed(): void {
    this.initializePayments()
  }


  goBackToCustomerForm(): void {
    this.isShowPaymentSection = false
  }

  onSubmit(): void {
    if (this.newCustomerForm.valid && this.isPaymentValid) { this.createNewCustomer() }
  }

  done(): void {
    this.router.navigateByUrl('/customers')
  }


}
