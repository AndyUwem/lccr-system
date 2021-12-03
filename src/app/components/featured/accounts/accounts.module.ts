import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AttendantLoginComponent } from "./attendant-login/attendant-login.component";



@NgModule({
    declarations: [AttendantLoginComponent],
    imports: [CommonModule,FormsModule],
    exports: [AttendantLoginComponent]
})

export class AccountsModule{}