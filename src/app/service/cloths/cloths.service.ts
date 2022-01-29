import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cloth } from "src/app/interface/cloth.interface";
import { environment } from "src/environments/environment";

 
 @Injectable({
     providedIn: 'root'
 })

 export class ClothService{

     private USERS_ENDPOINT: string = `${environment.firebase.databaseURL}/users`
     
      constructor(private httpClient: HttpClient ){}

        updateCloth(customerId: string, cloth: Cloth[] ): Observable<Cloth[]>{
           return this.httpClient.patch<Cloth[]>(`${this.USERS_ENDPOINT}/${customerId}.json`, { cloth } )
        }
        
 }