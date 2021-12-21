import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PaymentHelperService } from "src/app/service/payments/paymentsHelper.service";
import { PaymentListComponent } from "./payment-list/payment-list.component";


@NgModule({
    declarations: [PaymentListComponent],
    imports: [CommonModule, FormsModule],
    exports: [PaymentListComponent],
    providers: [PaymentHelperService]
})

export class PaymentsModule { }