import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnDestroy{

  clock: string = '';
  attendantName: string = 'BobCat';
   private timeInterval!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.timeInterval =  interval(1000).subscribe((t: number) => {
      this.handleTime();
    });
  
  }


ngOnDestroy(): void{
  this.timeInterval.unsubscribe()
}

handleTime() {
  let currentClock = new Date(),
    hours = currentClock.getHours(),
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
