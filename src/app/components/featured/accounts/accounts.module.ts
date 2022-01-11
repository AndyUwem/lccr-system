import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./authentication/auth.service";
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';



@NgModule({
    declarations: [
        UserLoginComponent,
        UserRegisterComponent
    ],
    imports: [
        CommonModule, 
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        UserLoginComponent,
        UserRegisterComponent
    ],

    providers: [AuthService]
})

export class AccountsModule { }