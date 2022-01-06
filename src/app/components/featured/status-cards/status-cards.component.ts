import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interface/customer.interface';
import { Payment } from 'src/app/interface/payment.interface';
import { CustomerService } from 'src/app/service/customers/customers.service';

interface StatusCardData {
  payments: Array<number>,
  totalSales: number,
  totalCloths: number
}
@Component({
  selector: 'app-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.css']
})
export class StatusCardsComponent implements OnInit {

  public statusCards: Array<{ header: string, value: string }> = []

  public isLoading: boolean = true

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.updateStatusCards()
  }


  private updateStatusCards(): void {

    this.calculateTotalSales()
      .then((statusCard: StatusCardData) => {

        this.customerService.findAll().subscribe((customer: Array<Customer>) => {
          const statusCards = [
            { header: 'Customers', value: customer.length + '' },
            { header: 'Total Cloths', value: statusCard.totalCloths + '' },
            { header: 'In Progress', value: 0 + '' },
            { header: 'Total Sales', value: this.formatNumberToCurrency(statusCard.totalSales) }
          ]
          this.statusCards.push(...statusCards)
        })
      })
      .catch((err: Error) => console.log(err.message))

  }


  private calculateTotalSales(): Promise<StatusCardData> {

    return new Promise((resolve, reject) => {

      const statusCardData = { payments: [0], totalSales: 0, totalCloths: 0 }

      this.customerService.findAll().subscribe((customers: Array<Customer>) => {
        customers.forEach((customer: Customer) => {
          customer.payments.forEach((payment: Payment) => statusCardData.payments.push(parseInt(payment.amountPaid + '')))
          statusCardData.totalCloths += customer.cloth.length
        })
        getTotalSales()
      })

      const getTotalSales = (): void => {
        for (let i = 0; i < statusCardData.payments.length; i++) {
          statusCardData.totalSales += statusCardData.payments[i]
        }
        this.isLoading = false
        resolve(statusCardData)
        reject(new Error('calculateTotalSales promise was unable to calculate resolve'))
      }

    })
  }

  private formatNumberToCurrency(numberToFormat: number): string {
    return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'NGN' })
      .format(numberToFormat)
  }


}
