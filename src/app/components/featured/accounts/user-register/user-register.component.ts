import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/entities/admin.entity';
import { Customer } from 'src/app/interface/customer.interface';
import { LoginData } from 'src/app/interface/login-data.interface';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public userRegisterForm!: FormGroup;
  public isLoading: boolean = false

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
      ) { }

  ngOnInit(): void {
    this.initializeUserRegisterForm()
  }


  private initializeUserRegisterForm(): void {
       this.userRegisterForm = new FormGroup({
         names: this.fb.control('', [Validators.required]),
         age: this.fb.control('', [Validators.required]),
         phone : this.fb.control('', [Validators.required]),
         gender : this.fb.control('', [Validators.required]),
         dateRegistered: this.fb.control({ value: new Date().toUTCString(), disabled: true }),
         address: this.fb.control('', [Validators.required]),
         role: this.fb.control('Administrator'),
         companyName: this.fb.control('', [Validators.required]),
         companyImage: this.fb.control('', [Validators.required]),

         email: this.fb.control('', [Validators.required, Validators.email]),
         password: this.fb.control('', [Validators.required]),
       })
  }

  get names (): FormControl { 
    return this.userRegisterForm.get('names') as FormControl;
  }

  get age (): FormControl { 
    return this.userRegisterForm.get('age') as FormControl;
  }

  get phone (): FormControl { 
    return this.userRegisterForm.get('phone') as FormControl;
  }

  get gender (): FormControl { 
    return this.userRegisterForm.get('gender') as FormControl;
  }

  get dateRegistered (): FormControl { 
    return this.userRegisterForm.get('dateRegistered') as FormControl;
  }

  get address (): FormControl { 
    return this.userRegisterForm.get('address') as FormControl;
  }

  get role (): FormControl { 
    return this.userRegisterForm.get('role') as FormControl;
  }

  get companyName (): FormControl { 
    return this.userRegisterForm.get('companyName') as FormControl;
  }

  get companyImage (): FormControl { 
    return this.userRegisterForm.get('companyImage') as FormControl;
  }


  get email (): FormControl { 
    return this.userRegisterForm.get('email') as FormControl;
  }

  get password (): FormControl { 
    return this.userRegisterForm.get('password') as FormControl;
  }

  private getUserEmailAndPassword(): LoginData{ 
    const userAccounts: LoginData = {
       email: this.email?.value,
       password: this.password?.value
    }
    return userAccounts
  }

  private getEmptyCustomer(): Customer{
     const customer: Customer = {
      id: '',
      names: '',
      phone: 0,
      gender: '',
      dateRegistered: '',
      address: '',
      cloth: [],
      payments: []
    }

    return customer;
  }

  registerUser(): void {
    this.isLoading = true
     this.authService.setUserAccount(this.getUserEmailAndPassword())
     .then((responseData: any) => {
      
        const newUser = new Admin()
              newUser.setId(responseData.user.auth.currentUser.uid)
              newUser.setNames(this.names?.value)
              newUser.setAge(this.age?.value)
              newUser.setPhone(this.phone?.value)
              newUser.setGender(this.gender?.value)
              newUser.setAdress(this.address?.value)
              newUser.setDateRegistered(this.dateRegistered?.value)
              newUser.setUserRole(this.role?.value)
              newUser.setCompanyName(this.companyName?.value)
              newUser.setCompanyIamge(this.companyImage?.value)
              newUser.setAttendants([])
              newUser.setCustomers([this.getEmptyCustomer()])
             
              this.authService.saveUserToFireBase(newUser)
              .subscribe({
                  next: () => {
                    this.isLoading = false
                    this.authService
                    .logInUser(this.getUserEmailAndPassword())
                    .then((responseData: any) => {
                      this.authService.setUserToken(responseData.user.auth.currentUser.accessToken);
                      this.router.navigate(['home/dashboard'])
                    })
                    .catch(err => console.log(err.code))
                 },
                 error: err => console.log(err.message)
              })
     })
     .catch(err => this.isLoading = false )
  }




}
