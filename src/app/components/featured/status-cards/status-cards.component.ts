import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CustomerService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.css'],
  providers: [CustomerService],
})
export class StatusCardsComponent implements OnInit, OnDestroy {
  customers: any = [];
  customerCount: number = 0;

  clock: string = '';
  attendantName: string = 'BobCat';
   private timeInterval!: Subscription;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomersCounts();

    this.timeInterval =  interval(1000).subscribe((t: number) => {
      this.handleTime();
    });
  }
 ngOnDestroy(): void{
    this.timeInterval.unsubscribe()
  }

  getCustomersCounts() {
    return this.customerService.findAll().subscribe((customers) => {
      this.customers = customers;
    });
  }

  updateCustomersStatus(customers: any) {
    return (this.customerCount = customers.length);
  }

  handleTime() {
    let currentClock = new Date(),
      hours = currentClock.getHours(),
      minutes = currentClock.getMinutes(),
      clockWeather = '',
      greetings = '';

    if (currentClock.toLocaleString().endsWith('PM')) {

      clockWeather = 'PM';
        if(hours <= 12 || hours < 5) 
           greetings = `Good Afternoon! ${this.attendantName}`;
        else
           greetings = `Good Evening! ${this.attendantName}`;
      

     } else {
      clockWeather = 'AM';
      if(hours < 11) greetings = `Good Afternoon! ${this.attendantName}`;
      greetings = `Good Morning! ${this.attendantName}`;
    };

    return (this.clock = `${greetings},   ${currentClock.toLocaleString()}`);
  }




}
