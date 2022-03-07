import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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


export class UserLoginComponent implements OnInit, OnDestroy, AfterViewInit {

  private currentUser: any;

  public loginForm!: FormGroup;
  public isAdmin!: boolean;
  public arrayOfLoginTypes: Array<string> = ['Administrator', 'Attendant'];
  public loginType!: string;
  public userRole: string = 'Administrator';
  public isLoading: boolean = false
  @ViewChild('serverValidationFeedback') serverValidationFeedbackRef!: ElementRef;
  @ViewChild('card_register') card_register!: ElementRef;
  @ViewChild('login_container_cover') login_container_cover!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private adminService: AdminService,
    private attendantService: AttendantsService,
    private render2: Renderer2
  ) {}

  ngOnInit(): void {
    this.initializeLoginType();
    this.initializeLoginForm();
    this.onUserLoggedInCheck();
    this.onLoginTypeChange();
  }

  ngAfterViewInit(): void {
      this.hideServerErrorText(true)
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

  public navigateToHome(): void {
    this.router.navigate(['home/dashboard']);
  }

  public switchToLoginView() : void {
      this.render2.setStyle(this.card_register.nativeElement, 'display', 'none');
      this.render2.setStyle(this.login_container_cover.nativeElement, 'display', 'flex');
  }


  private hideServerErrorText(booleanEventProperty: boolean): void{
    this.serverValidationFeedbackRef.nativeElement.hidden = booleanEventProperty;
  }

  public onLoginTypeChange(): void {
    if (this.loginType === this.arrayOfLoginTypes[0]) {
      this.isAdmin = true;
      this.loginForm.patchValue({
        administratorID: this.arrayOfLoginTypes[0]
      })
    }
    else {
      this.isAdmin = false;
      this.loginForm.patchValue({
        administratorID: ''
      })
    }
  }


  private loginUser(): void {
     this.isLoading = true;
     this.hideServerErrorText(true)
     
     this.authService
      .logInUser(this.getUserInfo())
      .then((responseData: any) => {
        this.currentUser = responseData.user.auth.currentUser;
        this.getUser();
      })
      .catch((e) => {
        console.log(e.code)
        this.isLoading = false
        this.hideServerErrorText(false)
      });
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
      this.isLoading = false;
      this.navigateToHome();
     }
     else{
       this.hideServerErrorText(false)
       this.isLoading = false;
     }
       
  }

  ngOnDestroy(): void {
    this.subscriptionService.remove();
  }


}
