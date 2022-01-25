import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interface/login-data.interface';
import { AdminService } from 'src/app/service/admin/admin.service';
import { AttendantsService } from 'src/app/service/attendants/attendants.service';
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
  public isRegisterUser: boolean = false;
  public userRole: string = "Administrator"

  constructor(
    private router: Router,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private adminService: AdminService,
    private attendantService: AttendantsService
  ) {}

  ngOnInit(): void {
    this.initializeLoginType();
    this.initializeLoginForm();
    this.onUserLoggedInCheck();
    this.getSelectedLoginType();
  }

  private initializeLoginType(): void {
    this.loginType = this.arrayOfLoginTypes[0];
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

  private getUserInfo(): LoginData {
    const loginInfo: LoginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    return loginInfo;
  }

  validateLogin(): void {
    if (this.loginForm.valid) this.loginUser();
  }

  private navigateToHome(): void {
    this.router.navigate(['home/dashboard']);
  }

  getSelectedLoginType(): void {

    if(this.loginType === this.arrayOfLoginTypes[0] )
      this.isAdmin = true
    else 
      this.isAdmin = false

  }

  navigateToRegisterPage(): void {
    this.isRegisterUser = true;
  }

  navigateBackToLoginPage(booleanEventValue: any): void {
    this.isRegisterUser = booleanEventValue;
  }

  private getUser(uId: string): any{
     if(this.isAdmin){
       this.adminService.getAdminFromFireBase(uId)
       .subscribe({
          next: (admin) =>  {
             this.authService.setUserREf(admin)
             this.navigateToHome();
            },
          error: (err) => console.log(err.message)
       })
     }
     else{
       console.log('nothing')
     }


  }


  private loginUser(): void {
    this.authService
      .logInUser(this.getUserInfo())
      .then((responseData: any) => {
         const user = responseData.user.auth.currentUser;
         this.authService.setUserToken(user.accessToken);
         this.getUser(user.uid)
      })
      .catch((e: Error) => console.log(e.message));
  }

  ngOnDestroy(): void {
    this.subscriptionService.remove();
  }
}
