import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cloth } from 'src/app/entities/cloth.entity';
import { CustomerBuilder } from 'src/app/entities/customer.entity';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  providers: [CustomerService]
})
 
export class CreateCustomerComponent implements OnInit {

  newCustomerForm = new FormGroup({});

  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.newCustomerForm = this.fb.group({
      names: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      gender: ['', Validators.required],
      registeredDate: [new Date().toUTCString()],
      cloths: this.fb.array([])
    })
  }

  addCloths(): void {
    let cloth = this.fb.group({
      clothName: [null,Validators.required],
      clothColor: [null, Validators.required],
      clothCategory: ['', Validators.required],
      serviceType: ['', Validators.required],
      deliveryStatus: ['', Validators.required],
      clothStatus: ['', Validators.required],
      description: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      payments: [{}]
     });

    (this.newCustomerForm.get('cloths') as FormArray).push(cloth)
  }


  get cloths(): FormArray{ return (this.newCustomerForm.get('cloths') as FormArray); }
  get names() { return this.newCustomerForm.get('names'); }
  get phone() { return this.newCustomerForm.get('phone'); }
  get address() { return this.newCustomerForm.get('address'); }
  get gender() { return this.newCustomerForm.get('gender'); }
  get registeredDate() { return this.newCustomerForm.get('registeredDate'); }


  removeCloth(index: number): void { this.cloths.removeAt(index) }
  
  get clothControls(): AbstractControl {
    let controls: any
    this.cloths.controls.forEach((cloth) => controls = cloth)
    return controls
  }

  setValidationFor(formControl: string){
    return( this.newCustomerForm.get(formControl)?.invalid && 
           (this.newCustomerForm.get(formControl)?.dirty || this.newCustomerForm.get(formControl)?.touched))
  }

  
  createNewCustomer() {

    let cloths = new Cloth(
      this.clothControls.value.clothName,
      this.clothControls.value.clothColor,
      this.clothControls.value.clothCategory,
      this.clothControls.value.serviceType,
      this.clothControls.value.deliveryStatus,
      this.clothControls.value.clothStatus,
      this.clothControls.value.pickUpDate,
      this.clothControls.value.payments,
      this.clothControls.value.description
    )

    let customer = new CustomerBuilder( this.names?.value, this.phone?.value, this.gender?.value)

      .setAdress(this.address?.value)

      .setDateRegistered(this.registeredDate?.value)

      .setCloth([cloths])

      .build()

      return this.customerService.createCustomer(customer).subscribe(res => console.log(res))
  }
  

  onSubmit() {
    if (this.newCustomerForm.valid){
        this.createNewCustomer()
        this.router.navigateByUrl('/customers')
     }
  }

  

}
