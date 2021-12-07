import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, Subject } from "rxjs";
import { Customer } from "../interface/customer.interface";

@Injectable({
    providedIn: 'root'
})

export class CustomerService {

    private CUSTOMERS_API: string = 'https://laundry-records-system-default-rtdb.firebaseio.com'

    private subject = new Subject<any>() 


    constructor(private http: HttpClient) { }

    createCustomer(customer: {}) {
        return this.http.post(`${this.CUSTOMERS_API}/customers.json`, customer)
    }

    findAll() {
        return this.http.get(`${this.CUSTOMERS_API}/customers.json`)
            .pipe(map((responseData: any) => {
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

