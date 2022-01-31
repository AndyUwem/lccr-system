import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
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
      phone: this.fb.control('', [Validators.required]),
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

  get names(): FormControl {
    return this.userRegisterForm.get('names') as FormControl;
  }

  get age(): FormControl {
    return this.userRegisterForm.get('age') as FormControl;
  }

  get phone(): FormControl {
    return this.userRegisterForm.get('phone') as FormControl;
  }

  get gender(): FormControl {
    return this.userRegisterForm.get('gender') as FormControl;
  }

  get dateRegistered(): FormControl {
    return this.userRegisterForm.get('dateRegistered') as FormControl;
  }

  get address(): FormControl {
    return this.userRegisterForm.get('address') as FormControl;
  }

  get role(): FormControl {
    return this.userRegisterForm.get('role') as FormControl;
  }

  get companyName(): FormControl {
    return this.userRegisterForm.get('companyName') as FormControl;
  }

  get companyImage(): FormControl {
    return this.userRegisterForm.get('companyImage') as FormControl;
  }

  get email(): FormControl {
    return this.userRegisterForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.userRegisterForm.get('password') as FormControl;
  }

  private getUserEmailAndPassword(): LoginData {
    const userAccounts: LoginData = {
      email: this.email?.value,
      password: this.password?.value,
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


  registerUser(): void {
    this.isLoading = true;

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

  tshoot(): void {
    console.log(this.handleUserBuilder())
  }

  private handleUserBuilder(): any {
     const newUserId: string = this.userAccount.user.auth.currentUser.uid;

    if(this.isAdmin){
      const admin = new Admin();
      admin.setId(newUserId);
      admin.setNames(this.names?.value);
      admin.setAge(this.age?.value);
      admin.setPhone(this.phone?.value);
      admin.setGender(this.gender?.value);
      admin.setAdress(this.address?.value);
      admin.setDateRegistered(this.dateRegistered?.value);
      admin.setUserRole(this.role?.value);
      admin.setCompanyName(this.companyName?.value);
      admin.setCompanyIamge(this.companyImage?.value);
      admin.setUserAccount(this.getUserEmailAndPassword());

      return admin;
    }
   
    else if (!this.isAdmin) {
      const attendant = new Attendant();
      attendant.setId(newUserId)
      attendant.setEmployerId(this.authService.getAdminId);
      attendant.setNames(this.names?.value);
      attendant.setAge(this.age?.value);
      attendant.setPhone(this.phone?.value);
      attendant.setGender(this.gender?.value);
      attendant.setAdress(this.address?.value);
      attendant.setDateRegistered(this.dateRegistered?.value);
      attendant.setUserRole(this.role?.value);
      attendant.setUserAccount(this.getUserEmailAndPassword()); 
      
      return attendant;
    }
   

  }

  public cancelUserRegistration(): void {
    this.backToLoginScreen.emit(false);
  }
}
