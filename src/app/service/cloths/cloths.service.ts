import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cloth } from "src/app/interface/cloth.interface";
import { environment } from "src/environments/environment";

 
 @Injectable({
     providedIn: 'root'
 })

 export class ClothService{

     private ADMINISTRATORS_API: string = `${environment.firebase.databaseURL}/users`
     
      constructor(private httpClient: HttpClient ){}

        public updateCloth(adminId: string, customerId: string, cloth: Cloth[] ): Observable<Cloth[]>{
           return this.httpClient.patch<Cloth[]>(`${this.ADMINISTRATORS_API}/${adminId}/customers/${customerId}.json`, { cloth } )
        }
            
 }