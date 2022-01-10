import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

   loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.onUserLoggedInCheck()
    this.initializeLoginForm()
  }


  private initializeLoginForm(): void{
      this.loginForm = new FormGroup({
        userId: new FormControl('',[Validators.required]),
        password: new FormControl('',[Validators.required])
      })
  }

  private onUserLoggedInCheck(): void {
    if(this.authService.isUserLoggedIn())
       this.router.navigate(['home/dashboard'])
  }

  validateLogin(): void {
     if(this.loginForm.valid)
      this.authService.loginUser(this.loginForm.value)
  }


}
