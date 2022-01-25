import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Attendant } from "src/app/interface/attendant.interface";
import { User } from "src/app/interface/user.interface";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class AttendantsService{

     constructor(private httpClient: HttpClient){}

     AddNewAttendant(uId: string, attendant: User): Observable<Attendant> {
         return this.httpClient
            .post<Attendant>(`${environment.firebase.databaseURL}/users/${uId}/attendants.json`, attendant)
     }

     findAllAttendants(uId: string): Observable<Attendant[]> {
        return this.httpClient
            .get<Attendant[]>(`${environment.firebase.databaseURL}/users/${uId}/attendants.json`)
            .pipe(map((responseData: Attendant[]) => {

                let attendants = []

                 for(const key in responseData){
                     if(responseData.hasOwnProperty(key))
                    attendants.push({...responseData[key], id: key })
                 }
                 return attendants;

            }))
    }

}