import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClothStatus } from 'src/app/interface/cloth-status.interface';
import { Cloth } from 'src/app/interface/cloth.interface';
import { Customer } from 'src/app/interface/customer.interface';
import { ClothService } from 'src/app/service/cloths/cloths.service';
import { CustomerService } from 'src/app/service/customers/customers.service';
import { SubscriptionService } from 'src/app/service/subscription/subscription.service';


@Component({
  selector: 'app-cloths-list',
  templateUrl: './cloths-list.component.html',
  styleUrls: ['./cloths-list.component.css']
})
export class ClothsListComponent implements OnInit, OnDestroy{

  private selectedCloth!: Cloth;
  private updatedClothsStatus!: ClothStatus;
  public customerCloths!: Cloth[]
  public customer!: Customer
  public clothStatusEditForm!: FormGroup;
  public newClothForm!: FormGroup;
  public isLoading: boolean = true

  constructor(
    private clothService: ClothService,
    private customerService: CustomerService,
    private subscriptionService: SubscriptionService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCustomer()
    this.initializeClothStatusForm()
    this.initializeNewClothForm()
    this.handleOnClothStatusChange()
  }

  private getCustomer(): void {
   this.subscriptionService.add = this.customerService.getCustomerRef()
      .subscribe((customer: Customer) => {
        this.customer = customer
        this.customerCloths = this.customer.cloth
        this.isLoading = false
      })
  }

  handleClothStatusForm(cloth: Cloth): void {
    this.clothStatusEditForm.patchValue({
     deliveryStatus: cloth.deliveryStatus,
     progressStatus: cloth.clothStatus,
     pickUpDate: cloth.pickUpDate
   })

   this.selectedCloth = cloth
 }

  private initializeClothStatusForm(): void {
    this.clothStatusEditForm = this.fb.group({
      deliveryStatus: this.fb.control('', Validators.required),
      progressStatus: this.fb.control('', Validators.required),
      pickUpDate: this.fb.control('', Validators.required)
    })
  }


  private handleOnClothStatusChange(): void {
    this.clothStatusEditForm.valueChanges.subscribe((value: ClothStatus) => {
      const { deliveryStatus, progressStatus, pickUpDate } = value
      const newClothStatus: ClothStatus = {
        deliveryStatus,
        progressStatus,
        pickUpDate
      }
      this.updatedClothsStatus = newClothStatus
    })
  }


  updateClothArray(): void {
    const index: number = this.customerCloths.indexOf(this.selectedCloth)
    const { deliveryStatus, progressStatus, pickUpDate } = this.updatedClothsStatus
    this.customer.cloth[index].deliveryStatus = deliveryStatus
    this.customer.cloth[index].clothStatus = progressStatus
    this.customer.cloth[index].pickUpDate = pickUpDate

    // this.customerCloths[index].deliveryStatus = deliveryStatus
    // this.customerCloths[index].clothStatus = progressStatus
    // this.customerCloths[index].pickUpDate = pickUpDate

    this.updateCloth(this.customer)
  }


  private updateCloth(customer: Customer): void {
    this.clothService.updateCloth(customer.id, customer.cloth)
    .subscribe(() => {})
  }


  private initializeNewClothForm(): void {
    this.newClothForm = this.fb.group({
      clothName: this.fb.control('', Validators.required),
      clothColor: this.fb.control('', Validators.required),
      clothCategory: this.fb.control('', Validators.required),
      serviceType: this.fb.control('', Validators.required),
      clothStatus: this.fb.control('', Validators.required),
      deliveryStatus: this.fb.control('', Validators.required),
      cost: this.fb.control('', Validators.required),
      pickUpDate: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required)
    })
  }

  saveNewCloth(): void{
    this.customer.cloth.push(this.newClothForm.value)
    this.updateCloth(this.customer)
  }

  ngOnDestroy(): void {
    this.subscriptionService.remove()
  }

}
