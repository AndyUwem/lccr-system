import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

   customerCloths!: Cloth[]
  private selectedCloth!: Cloth;
  private updatedClothsStatus!: ClothStatus;
  private customer!: Customer
  public clothStatusForm!: FormGroup;

  constructor(
    private clothService: ClothService,
    private customerService: CustomerService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.initClothStatusForm()
    this.handleOnClothStatusChange()
    this.getCustomer()
  }

  private getCustomer(): void {
   this.subscriptionService.add = this.customerService.getCustomerRef()
      .subscribe((customer: any) => {
        this.customer = customer
        this.customerCloths = this.customer.cloth
      })
  }

  private initClothStatusForm(): void {
    this.clothStatusForm = new FormGroup({
      deliveryStatus: new FormControl('', Validators.required),
      progressStatus: new FormControl('', Validators.required),
      pickUpDate: new FormControl('', Validators.required)
    })
  }

  private handleOnClothStatusChange(): void {
    this.clothStatusForm.valueChanges.subscribe((value: ClothStatus) => {

      const { deliveryStatus, progressStatus, pickUpDate } = value
      const newClothStatus: ClothStatus = {
        deliveryStatus,
        progressStatus,
        pickUpDate
      }
      this.updatedClothsStatus = newClothStatus
    })
  }

  getPreviousClothValues(cloth: Cloth): void {
    this.clothStatusForm.patchValue({
      deliveryStatus: cloth.deliveryStatus,
      progressStatus: cloth.clothStatus,
      pickUpDate: cloth.pickUpDate
    })

    this.selectedCloth = cloth
  }


  updateClothArray(): void {
    const index: number = this.customerCloths.indexOf(this.selectedCloth)
    const { deliveryStatus, progressStatus, pickUpDate } = this.updatedClothsStatus
    this.customerCloths[index].deliveryStatus = deliveryStatus
    this.customerCloths[index].clothStatus = progressStatus
    this.customerCloths[index].pickUpDate = pickUpDate

    this.updateCloth(this.customer)
  }

  private updateCloth(customer: Customer): void {
    this.clothService.updateCloth(customer.id, customer.cloth)
    .subscribe((cloths: Cloth[]) => {
        console.log(cloths)
    })
  }


  ngOnDestroy(): void {
    this.subscriptionService.remove()
  }

}
