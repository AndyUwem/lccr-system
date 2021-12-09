import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { Customer } from "../interface/customer.interface";

@Injectable({
    providedIn: 'root'
})

export class CustomerService {

    private CUSTOMERS_API: string = 'https://laundry-records-system-default-rtdb.firebaseio.com'


    constructor(private http: HttpClient) { }

    createCustomer(customer: {}): Observable<Customer>{
        return this.http.post<Customer>(`${this.CUSTOMERS_API}/customers.json`, customer)
    }

    findAll(): Observable<Customer[]>{
        return this.http.get<Customer[]>(`${this.CUSTOMERS_API}/customers.json`)
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

        return this.http.get<Customer>(`${this.CUSTOMERS_API}/customers/${customerId}.json`)
            .pipe(map(responseData => {
                let customerObject = {} as Customer

                if (responseData) { 
                    customerObject = responseData 
                 }
                
                return customerObject
            }))
    }


}

