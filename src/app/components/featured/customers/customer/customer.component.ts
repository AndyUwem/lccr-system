import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cloth } from 'src/app/interface/cloth.interface';
import { Customer } from 'src/app/interface/customer.interface';

import { CustomerService } from 'src/app/service/customers/customers.service';
import { AuthService } from '../../accounts/authentication/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  public customer: any = {};
  public customerCloths: Array<Cloth> = [];
  public isLoading: boolean = true;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  private getCustomer(): void {
    let customerId!: string;
    this.route.params.subscribe(
      (params: Params) => (customerId = params['id'])
    );

    this.customerService
      .findCustomerById(this.authService.getAdminId, customerId)
      .subscribe({
            next: (customer: Customer) => {
              this.customer = { ...customer };
              this.customer.id = customerId;
              this.setCustomerCloths(customer);
              this.setCustomerRef(this.customer);
            },
            error: (err) => console.log(err.message)
      });
  }
  
  private setCustomerCloths(customer: Customer): void {
    this.customerCloths.push(...customer.cloth);
  }

  private setCustomerRef(customer: Customer): void {
    this.customerService.setCustomerRef(customer);
  }

  cancelButton() {
    this.router.navigateByUrl('home/customers');
  }
}
