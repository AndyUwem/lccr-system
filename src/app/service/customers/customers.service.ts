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
    private CUSTOMERS_API: string = environment.CUSTOMERS_API

    constructor(private http: HttpClient) { }

    createCustomer(customer: {}): Observable<Customer>{
        return this.http.post<Customer>(`${this.CUSTOMERS_API}.json`, customer)
    }

    findAll(): Observable<Customer[]>{
        return this.http.get<Customer[]>(`${this.CUSTOMERS_API}.json`)
            .pipe(map((responseData: Customer[]) => {
                let customers = [];

                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key))
                        customers.push({ ...responseData[key], id: key })
                }
                return customers;
            }))
    }


    findCustomerById(customerId: string): Observable<Customer> {

        return this.http.get<Customer>(`${this.CUSTOMERS_API}/${customerId}.json`)
            .pipe(map(responseData => {
                let customerObject = {} as Customer
                if (responseData) { 
                    customerObject = responseData 
                 }
                return customerObject
            }))
    }


     setCustomerRef(customer: Customer): void {
        this.customerReference.next(customer)
      }

       getCustomerRef(): Observable<Customer>{
       return this.customerReference.asObservable()
    }
}

