import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cloth } from "src/app/interface/cloth.interface";
import { environment } from "src/environments/environment";

 
 @Injectable({
     providedIn: 'root'
 })

 export class ClothService{

     private CUSTOMERS_API: string = environment.CUSTOMERS_API
     
      constructor(private httpClient: HttpClient ){}

        updateCloth(customerId: string, cloth: Cloth[] ): Observable<Cloth[]>{
           return this.httpClient.patch<Cloth[]>(`${this.CUSTOMERS_API}/${customerId}.json`, { cloth } )
        }
        
 }