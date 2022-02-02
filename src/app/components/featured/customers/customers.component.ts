import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer.interface';
import { CustomerService } from 'src/app/service/customers/customers.service';
import { AuthService } from '../accounts/authentication/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})

export class CustomersComponent implements OnInit {
  public isAdmin: boolean = false;
  public isLoading: boolean = true;
  public hasInternetConnectionError!: boolean;
  public customers: Array<Customer> = [];
  public searchTerm: string = '';
  public selectFilterBy: string = 'names';
  public searchFieldPlaceHolder: string = '';

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
    this.updateSearchPlaceholder();
    this.isAdmin = this.getUserRole();
  }

  private getAllCustomers() {
       this.customerService
      .findAll(this.authService.getAdminId)
      .subscribe({
        next: (response: Customer[]) => {
          this.customers = response
          this.isLoading = false
        },
        error: () => this.hasInternetConnectionError = true
      });
  }

  public updateSearchPlaceholder(): void {
    this.searchFieldPlaceHolder = `search customers by ${this.selectFilterBy}`;
  }

  private getUserRole(): boolean {
    return this.authService.isUserAdministrator();
  }
}
