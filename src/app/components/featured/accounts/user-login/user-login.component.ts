import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interface/login-data.interface';
import { SubscriptionService } from 'src/app/service/subscription/subscription.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public isAdmin!: boolean;
  public arrayOfLoginTypes: Array<string> = ['Administrator', 'Attendant'];
  public loginType!: string;
  public userRegister: boolean = false

  constructor(
    private router: Router,
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.initializeLoginType();
    this.initializeLoginForm();
    this.onUserLoggedInCheck();
  }

  private initializeLoginType(): void {
    this.loginType = this.arrayOfLoginTypes[0];
    this.isAdmin = true;
  }

  private initializeLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private onUserLoggedInCheck(): void {
    if (this.authService.isUserLoggedIn()) this.navigateToHome();
  }

  private getUserInfo(): LoginData{
    const loginInfo: LoginData = { 
      email: this.loginForm.get('email')?.value, 
      password: this.loginForm.get('password')?.value
    }
    return loginInfo;
  }

  validateLogin(): void {
    if (this.loginForm.valid)
      this.authService
        .logInUser(this.getUserInfo())
        .then((responseData: any) => {
          this.authService.setUserToken(responseData.user.auth.currentUser.accessToken);
          this.navigateToHome()
        })
        .catch((e: Error) => console.log(e.message));
  }


  private navigateToHome(): void {
    this.router.navigate(['home/dashboard']);
  }

  getSelectedLoginType(): boolean {
    if (this.loginType === this.arrayOfLoginTypes[0]) return (this.isAdmin = true);
    return (this.isAdmin = !this.isAdmin);
  }

  navigateToRegisterPage(): void {
    // this.router.navigate(['registerUser'])
    this.userRegister = true
  }

  registerUser(): void {
    this.authService
      .logInUser(this.getUserInfo())
      .then((responseData: any) => {
        console.log(responseData);
      });
  }


  ngOnDestroy(): void {
    this.subscriptionService.remove();
  }
}
