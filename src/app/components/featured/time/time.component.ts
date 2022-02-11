import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AuthService } from '../accounts/authentication/auth.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnDestroy{

  clock: string = '';
  private timeInterval!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.timeInterval =  interval(1000)
    .subscribe(() => this.handleTime());
  
  }

private handleTime() {
  let currentClock = new Date(),
    hours = currentClock.getHours(),
    clockWeather = '',
    greetings = '';

  if (currentClock.toLocaleString().endsWith('PM')) {

    clockWeather = 'PM';
      if(hours <= 12 || hours < 5) greetings = this.greetUser('Good Afternoon!');
      
        greetings = this.greetUser('Good Evening!');
    
   } else {
    clockWeather = 'AM';
    if(hours < 11) greetings = this.greetUser('Good Afternoon!');
     
       greetings = this.greetUser('Good Morning!');
  };

  return (this.clock = `${greetings}, ${currentClock.toLocaleString()}`);
}


private greetUser(message: string): string {
  const user = JSON.parse(this.authService.getUserRef())
  return `${message} ${user.names}`;
}


ngOnDestroy(): void{
  this.timeInterval.unsubscribe()
}

}
