import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClothStatus } from 'src/app/interface/cloth-status.interface';
import { Cloth } from 'src/app/interface/cloth.interface';
import { Customer } from 'src/app/interface/customer.interface';
import { ClothService } from 'src/app/service/cloths/cloths.service';
import { CustomerService } from 'src/app/service/customers/customers.service';
import { SubscriptionService } from 'src/app/service/subscription/subscription.service';
import { AuthService } from '../../accounts/authentication/auth.service';


@Component({
  selector: 'app-cloths-list',
  templateUrl: './cloths-list.component.html',
  styleUrls: ['./cloths-list.component.css']
})
export class ClothsListComponent implements OnInit, OnDestroy{

  private selectedCloth!: Cloth;
  private updatedClothsStatus!: ClothStatus;
  public customer!: Customer
  public clothStatusEditForm!: FormGroup;
  public newClothForm!: FormGroup;
  public isLoading: boolean = true
  public isAdmin: boolean = false

  constructor(
    private clothService: ClothService,
    private customerService: CustomerService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCustomer()
    this.initializeClothStatusForm()
    this.handleOnClothStatusChange()
    this.getUserRole()
  }

  private getCustomer(): void {
   this.subscriptionService.add = this.customerService.getCustomerRef()
      .subscribe((customer: Customer) => {
        this.customer = customer
        this.isLoading = false
      })
  }

  public handleClothStatusForm(cloth: Cloth): void {
    this.clothStatusEditForm.patchValue({
     deliveryStatus: cloth.deliveryStatus,
     progressStatus: cloth.clothStatus,
     pickUpDate: cloth.pickUpDate
   })

   this.selectedCloth = cloth
 }

  private initializeClothStatusForm(): void {
    this.clothStatusEditForm = new FormGroup({
      deliveryStatus: new FormControl('', Validators.required),
      progressStatus: new FormControl('', Validators.required),
      pickUpDate: new FormControl('', Validators.required)
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


  public updateClothArray(): void {
  const index: number = this.customer.cloth.indexOf(this.selectedCloth)
    const { deliveryStatus, progressStatus, pickUpDate } = this.updatedClothsStatus
    this.customer.cloth[index].deliveryStatus = deliveryStatus
    this.customer.cloth[index].clothStatus = progressStatus
    this.customer.cloth[index].pickUpDate = pickUpDate

    this.updateCloth(this.customer)
  }


  private updateCloth(customer: Customer): void {
    this.clothService
    .updateCloth(this.authService.getAdminId, customer.id, customer.cloth)
    .subscribe(() => {})
}

  public getNewCloth(newCloth: Cloth): void{
    this.customer.cloth.push(newCloth)
    this.updateCloth(this.customer)
  }

  private getUserRole(): void {
      this.isAdmin = this.authService.isUserAdministrator()
  }


  ngOnDestroy(): void {
    this.subscriptionService.remove()
  }

}
