import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Attendant } from 'src/app/interface/attendant.interface';
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

  private currentUser: any;

  public loginForm!: FormGroup;
  public isAdmin!: boolean;
  public arrayOfLoginTypes: Array<string> = ['Administrator', 'Attendant'];
  public loginType!: string;
  public isRegisterUser: boolean = false;
  public userRole: string = 'Administrator';

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
      email: new FormControl(''.trim(), [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(''.trim(), [Validators.required]),
      administratorID: new FormControl(''.trim(), [Validators.required]),
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

  public getSelectedLoginType(): void {
    if (this.loginType === this.arrayOfLoginTypes[0]) this.isAdmin = true;
    else this.isAdmin = false;
  }

  public navigateToRegisterPage(): void {
    this.isRegisterUser = true;
  }

  public navigateBackToLoginPage(booleanEventValue: any): void {
    this.isRegisterUser = booleanEventValue;
  }

  private loginUser(): void {
    this.authService
      .logInUser(this.getUserInfo())
      .then((responseData: any) => {
        this.currentUser = responseData.user.auth.currentUser;
        this.getUser();
      })
      .catch((e: Error) => console.log(e.message));
  }

  private getUser(): void {
    if (this.isAdmin) {
      this.adminService
      .getAdminFromFireBase(this.currentUser.uid)
       .subscribe({
        next: (admin) => this.handleUserAuthorization(admin),
        error: (err) => console.log(err.message),
      });
    } 
    else if (!this.isAdmin) {
       const adminId: string = this.loginForm.get('administratorID')?.value;
       const attendantId: string = this.currentUser.uid

        this.attendantService
        .findAttendantById(adminId, attendantId)
        .subscribe({
          next: (attendant: Attendant) => this.handleUserAuthorization(attendant),
          error: (err) => console.log(err.message)
        })
    }
  }

  private handleUserAuthorization(user: any): void {
    if(user !== null){
      this.authService.setUserToken(this.currentUser.accessToken);
      this.authService.setUserREf(user);
      this.navigateToHome();
     }
     else
       console.log('sorry this user does not exist')
  }

  ngOnDestroy(): void {
    this.subscriptionService.remove();
  }
}
