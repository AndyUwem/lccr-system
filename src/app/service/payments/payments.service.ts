import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Payment } from "../../interface/payment.interface";


@Injectable({
     providedIn: 'root'
})

export class PaymentService {


    private CUSTOMERS_API: string = environment.CUSTOMERS_API;

     constructor(private httpClient: HttpClient){

     }

     updatePayment(customerId: string, payments: Payment[]){
          return this.httpClient.patch(`${this.CUSTOMERS_API}/${customerId}.json`, { payments } )
     }
    
}