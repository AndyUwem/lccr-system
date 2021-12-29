import { Injectable, NgModule } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { Customer } from "src/app/interface/customer.interface";
import { Payment } from "src/app/interface/payment.interface";
import { PaymentError } from "src/app/interface/paymentError.interface";
import { PaymentService } from "./payments.service";

@Injectable({
    providedIn: 'root'
})


export class PaymentHelperService {


    constructor(private paymentService: PaymentService) { }

    createNewPayment(payment: any): Payment {
        return {
            date: payment.date,
            amountPaid: parseInt(payment.amountPaid),
            balanceOfPayment: parseInt(payment.balanceOfPayment),
            totalPayment: parseInt(payment.totalPayment)
        }

    }

    updatePayments(customerId: string, payments: Payment[]): Subscription {
        return this.paymentService.updatePayment(customerId, payments).subscribe(() => { })
    }

    validateBalanceOfPayment(
        newPayment: Payment,
        initialBalanceOfPayment: number,
        paymentError: PaymentError
    ): void {

        let currentDebt = Number(initialBalanceOfPayment)
        let amountPaid = Number(newPayment.amountPaid)

        if (!amountPaid)
            newPayment.balanceOfPayment = currentDebt
        else
            this.calculateBalanceOfPayment(newPayment, amountPaid, currentDebt, initialBalanceOfPayment, paymentError)
    }




    private calculateBalanceOfPayment(
        newPayment: Payment,
        amountPaid: number,
        currentDebt: number,
        initialBalanceOfPayment: number,
        paymentError: PaymentError
    ): void {

        const calculateBlance = currentDebt - amountPaid

        if (amountPaid > currentDebt) {
            newPayment.balanceOfPayment = currentDebt
            paymentError.isAmountExceed = true
            paymentError.errorMassage = `this customer can not pay more than: N${initialBalanceOfPayment}!`
        }
        else {
            paymentError.isAmountExceed = false
            newPayment.balanceOfPayment = calculateBlance
        }
    }


    getTotalAndBalance(payments: Payment[]): { total: number, balance: number } {
        let $payment = { total: 0, balance: 0 };
        payments.forEach((payment: Payment) => {
            $payment.total = payment.totalPayment;
            $payment.balance = payment.balanceOfPayment
        })
        return $payment;
    }



}