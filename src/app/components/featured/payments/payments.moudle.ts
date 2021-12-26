import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PaymentHelperService } from "src/app/service/payments/paymentsHelper.service";
import { NewPaymentComponent } from "./new-payment/new-payment.component";
import { CustomerPaymentListComponent } from "./payment-list/customer-payment-list.component";



@NgModule({
    declarations: [
        CustomerPaymentListComponent,
        NewPaymentComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CustomerPaymentListComponent,
        NewPaymentComponent
    ],
    providers: [PaymentHelperService]
})

export class PaymentsModule { }