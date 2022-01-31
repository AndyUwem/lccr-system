import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Payment } from "../../interface/payment.interface";


@Injectable({
     providedIn: 'root'
})

export class PaymentService {

    private ADMINISTRATORS_API: string = `${environment.firebase.databaseURL}/users`;

     constructor(private httpClient: HttpClient){

     }

     public updatePayment(adminId: string, customerId: string, payments: Payment[]){
          return this.httpClient.patch(`${this.ADMINISTRATORS_API}/${adminId}/customers/${customerId}.json`, { payments } )
     }
    
}