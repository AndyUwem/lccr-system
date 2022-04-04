import { Component, OnInit } from '@angular/core';
import { Cloth } from 'src/app/interface/cloth.interface';
import { Customer } from 'src/app/interface/customer.interface';
import { Payment } from 'src/app/interface/payment.interface';
import { CustomerService } from 'src/app/service/customers/customers.service';
import { formatNumberToCurrency } from 'src/app/service/payments/paymentsHelper.service';
import { AuthService } from '../accounts/authentication/auth.service';

type StatusCardData = {
  payments: Array<number>;
  totalSales: number;
  totalCloths: number;
  inProgress: number;
}
@Component({
  selector: 'app-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.css'],
})
export class StatusCardsComponent implements OnInit {
  public isLoading: boolean = true;
  public hasInternetConnectionError!: boolean;
  public statusCards: Array<{ header: string; value: string }> = [];
  public completedCloths = { clothsCompleted: 0, totalCloths: 0 };

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateStatusCards();
  }

  private updateStatusCards(): void {
    this.handleStatusCardUpdate()
      .then((statusCardData: StatusCardData) => {
        const { totalSales, totalCloths, inProgress } = statusCardData;
        this.customerService
          .findAll(this.authService.getAdminId)
          .subscribe({
             next: (customer: Array<Customer>) => {
              const statusCards = [
                { header: 'Customers', value: customer.length + '' },
                { header: 'Total Cloths', value: totalCloths + '' },
                {
                  header: 'In Progress',
                  value: `${inProgress + ''} / ${totalCloths + ''}`,
                },
                {
                  header: 'Total Sales',
                  value: formatNumberToCurrency(totalSales, 'NGN'),
                },
              ];
  
              this.statusCards.push(...statusCards);
              this.completedCloths.totalCloths = totalCloths;
              this.completedCloths.clothsCompleted = totalCloths - inProgress;
            },
             error: (err) => console.log(err)
          });
      })
      .catch((err) => console.log(err));
  }

  private handleStatusCardUpdate(): Promise<StatusCardData> {
    return new Promise((resolve, reject) => {
      const statusCardData: StatusCardData = {
        payments: [0],
        totalSales: 0,
        totalCloths: 0,
        inProgress: 0,
      };

      this.customerService
        .findAll(this.authService.getAdminId)
        .subscribe({
          next: (customers: Array<Customer>) => {
            customers.forEach((customer: Customer) => {
              customer.payments.forEach((payment: Payment) =>
                statusCardData.payments.push(parseInt(payment.amountPaid + ''))
              );
              statusCardData.totalCloths += customer.cloth.length;
  
              statusCardData.inProgress += this.getInProgressCounts(
                customer.cloth
              );
            });
            getTotalSales();
          },

          error: () => this.hasInternetConnectionError = true
        });

      const getTotalSales = (): void => {
        for (let i = 0; i < statusCardData.payments.length; i++) {
          statusCardData.totalSales += statusCardData.payments[i];
        }
        this.isLoading = false;
        resolve(statusCardData);
        reject(new Error('connot resolve promise'));
      };
    });
  }

  private getInProgressCounts(cloth: Cloth[]): number {
    let inProgress: Cloth[] = [];
    inProgress = cloth.filter((cloth) => cloth.clothStatus[0] === 'I');
    return inProgress.length;
  }

 
}
