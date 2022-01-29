import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Customer } from "../../interface/customer.interface";

@Injectable({
    providedIn: 'root'
})

export class CustomerService {

    private customerReference = new Subject<Customer>()
    private USERS_ENDPOINT: string = `${environment.firebase.databaseURL}/users`

    constructor(private http: HttpClient) { }

    public createCustomer(adminId: string, customer: {}): Observable<Customer>{
        return this.http.post<Customer>(`${this.USERS_ENDPOINT}/${adminId}/customers.json`, customer)
    }

    public findAll(adminId: string): Observable<Customer[]>{
        return this.http.get<Customer[]>(`${this.USERS_ENDPOINT}/${adminId}/customers.json`)
            .pipe(map((responseData: Customer[]) => {
                let customers = [];

                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key))
                        customers.push({ ...responseData[key], id: key })
                }
                return customers;
            }))
    }


    public findCustomerById(adminId: string, customerId: string): Observable<Customer> {

        return this.http.get<Customer>(`${this.USERS_ENDPOINT}/${adminId}/customers/${customerId}.json`)
            .pipe(map(responseData => {
                let customerObject = {} as Customer
                if (responseData)
                   customerObject = responseData 
                 
                return customerObject
            }))
    }


     public setCustomerRef(customer: Customer): void {
        this.customerReference.next(customer)
      }

     public getCustomerRef(): Observable<Customer>{
       return this.customerReference.asObservable()
    }
}

