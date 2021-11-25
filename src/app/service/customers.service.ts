import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})

export class CustomerService{

    private dBUrl: string = 'http://localhost:3000/customers'
  
 
     
    constructor(private http: HttpClient){}

    createCustomer(customer: {}){
       return this.http.post(this.dBUrl, customer)
    }
      
    findAll() {
        return this.http.get(this.dBUrl)
    }

 
}   

