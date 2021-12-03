import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-attendant-login',
  templateUrl: './attendant-login.component.html',
  styleUrls: ['./attendant-login.component.css']
})
export class AttendantLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  submit(x: NgForm){
      console.log(x.value.email, x.value.passcode)
  }

}
