import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/service/subscription/subscription.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup;
  public isAdmin!: boolean;
  public loginTypeArray: Array<string> = ['Administrator', 'Attendant']
  public loginType!: string;


  constructor(
    private router: Router,
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.initializeLoginType()
    this.initializeLoginForm()
    this.onUserLoggedInCheck()
  }

  private initializeLoginType(): void {
    this.loginType = this.loginTypeArray[0]
    this.isAdmin = true
  }

  private initializeLoginForm(): void {
    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  private onUserLoggedInCheck(): void {
    if (this.authService.isUserLoggedIn())
      this.navigateToHome()
  }

  validateLogin(): void {
    if (this.loginForm.valid)
      this.subscriptionService.add = this.authService
        .logInUser(this.loginForm.value)
        .subscribe({
          next: () => this.navigateToHome(),
          error: responseErrorMessage => alert(responseErrorMessage)
        });
}

  private navigateToHome(): void {
    this.router.navigate(['home/dashboard'])
  }

  getSelectedLoginType(): void {
    if (this.loginType === this.loginTypeArray[0])
      this.isAdmin = true
    else
      this.isAdmin = !this.isAdmin
  }

  ngOnDestroy(): void {
    this.subscriptionService.remove()
  }

}
