import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScrollingModule } from '@angular/cdk/scrolling';

import { PaymentHelperService } from "src/app/service/payments/paymentsHelper.service";
import { NewPaymentComponent } from "./new-payment/new-payment.component";
import { CustomerPaymentListComponent } from "./payment-list/customer-payment-list.component";
import { CustomPipesModule } from "src/app/pipes/pipes.module";



@NgModule({
    declarations: [
        CustomerPaymentListComponent,
        NewPaymentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ScrollingModule,

        CustomPipesModule
    ],
    exports: [
        CustomerPaymentListComponent,
        NewPaymentComponent
    ],
    providers: [PaymentHelperService]
})

export class PaymentsModule { }