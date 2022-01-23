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
  public customers: Array<Customer> = [];
  public searchTerm: string = '';
  public selectFilterBy: string = 'names';
  public searchFieldPlaceHolder: string = '';
  public isAdmin: boolean = false;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllCustomers();
    this.updateSearchPlaceholder();
    this.isAdmin = this.getUserRole();
  }

  getAllCustomers() {
    return this.customerService
      .findAll(this.authService.getAdminId())
      .subscribe((response: Customer[]) => (this.customers = response));
  }

  updateSearchPlaceholder(): void {
    this.searchFieldPlaceHolder = `search customers by ${this.selectFilterBy}`;
  }

  private getUserRole(): boolean {
    return this.authService.getUserRole();
  }
}
