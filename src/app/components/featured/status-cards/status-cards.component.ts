import { Component, OnInit } from '@angular/core';
import { Cloth } from 'src/app/interface/cloth.interface';
import { Customer } from 'src/app/interface/customer.interface';
import { Payment } from 'src/app/interface/payment.interface';
import { CustomerService } from 'src/app/service/customers/customers.service';
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
  public statusCards: Array<{ header: string; value: string }> = [];
  public isLoading: boolean = true;
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
          .subscribe((customer: Array<Customer>) => {
            const statusCards = [
              { header: 'Customers', value: customer.length + '' },
              { header: 'Total Cloths', value: totalCloths + '' },
              {
                header: 'In Progress',
                value: `${inProgress + ''} / ${totalCloths + ''}`,
              },
              {
                header: 'Total Sales',
                value: this.formatNumberToCurrency(totalSales),
              },
            ];

            this.statusCards.push(...statusCards);
            this.completedCloths.totalCloths = totalCloths;
            this.completedCloths.clothsCompleted = totalCloths - inProgress;
          });
      })
      .catch((err: Error) => console.log(err.message));
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
        .subscribe((customers: Array<Customer>) => {
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
        });

      const getTotalSales = (): void => {
        for (let i = 0; i < statusCardData.payments.length; i++) {
          statusCardData.totalSales += statusCardData.payments[i];
        }
        this.isLoading = false;
        resolve(statusCardData);
        reject(
          new Error(
            'handleStatusCardUpdate promise was unable to calculate resolve'
          )
        );
      };
    });
  }

  private getInProgressCounts(cloth: Cloth[]): number {
    let inProgress: Cloth[] = [];
    inProgress = cloth.filter((cloth) => cloth.clothStatus[0] === 'I');
    return inProgress.length;
  }

  private formatNumberToCurrency(numberToFormat: number): string {
    return new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'NGN',
    }).format(numberToFormat);
  }
}
