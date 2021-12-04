import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class CustomerService {

    private dBUrl: string = 'https://laundry-records-system-default-rtdb.firebaseio.com/customers.json'
    // 'http://localhost:3000/customers'



    constructor(private http: HttpClient) { }

    createCustomer(customer: {}) {
        return this.http.post(this.dBUrl, customer)
    }

    findAll() {
        return this.http.get(this.dBUrl)
            .pipe(map((responseData: any) => {
                let customers = [];

                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key))
                        customers.push({ ...responseData[key], id: key })
                 }
                return customers;
            }))
    }


}

