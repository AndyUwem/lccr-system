import { Component, OnInit } from '@angular/core';
import { Cloth } from 'src/app/interface/cloth.interface';
import { Customer } from 'src/app/interface/customer.interface';
import { Payment } from 'src/app/interface/payment.interface';
import { CustomerService } from 'src/app/service/customers/customers.service';

@Component({
  selector: 'app-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.css']
})
export class StatusCardsComponent implements OnInit {

  statusCards: Array<{header: string, value: string }> = []
  totalCloths: number = 0
  totalSales: number = 0

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.updateStatusCards()
  }


   updateStatusCards(): void {
    this.getAllClothsCounts()
    this.calculateTotalSales()

     this.customerService.findAll().subscribe((customer: Array<Customer>) => {

     const statusCards = [
        { header: 'Customers', value: customer.length+'' },
        { header: 'Total Cloths', value: this.totalCloths+'' },
        { header: 'In Progress', value: 0+'' },
        { header: 'Total Sales', value: this.formatNumberToCurrency(this.totalSales) }
      ]

      this.statusCards.push(...statusCards)

     })
   }


  getAllClothsCounts(): void{
     this.customerService.findAll().subscribe((customer: Array<Customer>) => {
         customer.filter( (customer: Customer ) => {
           this.totalCloths +=  customer.cloth.length
         })
     })
  }

  calculateTotalSales(): void{
    this.customerService.findAll().subscribe((customer: Array<Customer>) => {
        customer.filter( (customer: Customer ) => {
         customer.payments.filter( ( payment: Payment) => {
         this.totalSales += payment.amountPaid 
         })
        })
    })
 }

 formatNumberToCurrency(numberToFormat: number): string {
  return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'NGN'})
   .format(numberToFormat)
 }


}
