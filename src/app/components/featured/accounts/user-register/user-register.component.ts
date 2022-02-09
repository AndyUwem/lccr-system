import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/entities/admin.entity';
import { Attendant } from 'src/app/entities/attendant.entity';
import { LoginData } from 'src/app/interface/login-data.interface';
import { AdminService } from 'src/app/service/admin/admin.service';
import { AttendantsService } from 'src/app/service/attendants/attendants.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  public userRegisterForm!: FormGroup;
  public isLoading: boolean = false;
  public isAdmin!: boolean;

  @Output('backToLoginScreen') backToLoginScreen = new EventEmitter<boolean>();
  @Input('userRole') userRole!: string;
  public userAccount!: any;
  public isFormSubmitted: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private adminService: AdminService,
    private attendantService: AttendantsService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.getRoleType();
    this.initializeUserRegisterForm();
  }

  private initializeUserRegisterForm(): void {
    this.userRegisterForm = new FormGroup({
      names: this.fb.control('', [Validators.required]),
      age: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11)
      ]),
      gender: this.fb.control('', [Validators.required]),
      dateRegistered: this.fb.control({
        value: new Date().toUTCString(),
        disabled: true,
      }),
      address: this.fb.control('', [Validators.required]),
      role: this.fb.control({ value: this.userRole, disabled: true }),
      companyName: this.fb.control('', [Validators.required]),
      companyImage: this.fb.control('', [Validators.required]),

      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }


  public get f (): {[ key: string ]: AbstractControl} {
    return this.userRegisterForm.controls;
  }




  private getUserEmailAndPassword(): LoginData {
    const userAccounts: LoginData = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    };
    return userAccounts;
  }

  onImageValueChange(event: any): void {
    event.stopPropagation();
  }

  private getRoleType(): boolean {
    return this.userRole === 'Administrator' ? true : false;
  }

  private navigateToHome():void{
    this.router.navigate(['home/dashboard']);
  }


private isFormValidated(): boolean {
  this.isLoading = true;
  this.isFormSubmitted = true;

  if(!this.isAdmin){
    const user = JSON.parse(this.authService.getUserRef())
    this.userRegisterForm.patchValue({
      companyName: user.companyName,
      companyImage: user.companyImage,
    })
  }

  if(this.userRegisterForm.invalid){
    this.isLoading = false
    return false;
  }

     return true;
}


  registerUser(): void {
     if(this.isFormValidated())
         this.authService
        .setUserFirebaseLogin(this.getUserEmailAndPassword())
        .then((userAccount: any) => {
        this.userAccount = userAccount;
        this.handleUserRegistration()
      })
      .catch((err) => {
        this.isLoading = false
        console.log(err.message)
      });
     
  }

  
  private handleUserRegistration(): void {
    if (this.isAdmin) {
      const admin = this.handleUserBuilder();
      this.adminService.registerAdminToFireBase(admin).subscribe({
        next: () => {
          this.isLoading = false;
          this.authService.setUserREf(admin);
          this.loginAdmin();
        },
        error: (err) => console.log(err.message),
      });
    } 
    else if (!this.isAdmin) {
      const attendant = this.handleUserBuilder();
      this.attendantService
        .addNewAttendant(this.authService.getAdminId, attendant)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.cancelUserRegistration()
           }
          ,
          error: (err) => console.log(err.message),
        });
    }
  }
  

  private loginAdmin(): void {
    this.authService
      .logInUser(this.getUserEmailAndPassword())
      .then((userData: any) => {
        const userToken = userData.user.auth.currentUser.accessToken;
        this.authService.setUserToken(userToken);
        this.navigateToHome();
      })
      .catch((err) => console.log(err.code));
  }


  private handleUserBuilder(): any {
     const newUserId: string = this.userAccount.user.auth.currentUser.uid;

    if(this.isAdmin){
      const admin = new Admin();
      admin.setId(newUserId);
      admin.setNames(this.f['names'].value);
      admin.setAge(this.f['age'].value);
      admin.setPhone(this.f['phone'].value);
      admin.setGender(this.f['gender'].value);
      admin.setAdress(this.f['address'].value);
      admin.setDateRegistered(this.f['dateRegistered'].value);
      admin.setUserRole(this.f['role'].value);
      admin.setCompanyName(this.f['companyName'].value);
      admin.setCompanyIamge(this.f['companyImage'].value);
      admin.setUserAccount(this.getUserEmailAndPassword());

      return admin;
    }
   
    else if (!this.isAdmin) {
      const attendant = new Attendant();
      attendant.setId(newUserId)
      attendant.setEmployerId(this.authService.getAdminId);
      attendant.setNames(this.f['names'].value);
      attendant.setAge(Number(this.f['age'].value));
      attendant.setPhone(Number(this.f['phone'].value));
      attendant.setGender(this.f['gender'].value);
      attendant.setAdress(this.f['address'].value);
      attendant.setDateRegistered(this.f['dateRegistered'].value);
      attendant.setUserRole(this.f['role'].value);
      attendant.setUserAccount(this.getUserEmailAndPassword()); 
      
      return attendant;
    }
   

  }

  public cancelUserRegistration(): void {
    this.backToLoginScreen.emit(false);
  }
}
