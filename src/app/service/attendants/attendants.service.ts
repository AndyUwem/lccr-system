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

    private USERS_ENDPOINT: string = `${environment.firebase.databaseURL}/users`

     constructor(private httpClient: HttpClient){}

     public addNewAttendant(adminId: string, attendant: User): Observable<Attendant> {
         return this.httpClient
            .put<Attendant>(`${this.USERS_ENDPOINT}/${adminId}/attendants/${attendant.id}.json`, attendant)
     }

     public findAllAttendants(adminId: string): Observable<Attendant[]> {
        return this.httpClient
            .get<Attendant[]>(`${this.USERS_ENDPOINT}/${adminId}/attendants.json`)
            .pipe(map((responseData: Attendant[]) => {

                let attendants = []
                 for(const key in responseData){
                     if(responseData.hasOwnProperty(key))
                    attendants.push({...responseData[key], id: key })
                 }
                 return attendants;

            }))
    }

    public findAttendantById(adminId: string, attendantId: string): Observable<Attendant>{
        return this.httpClient.get<Attendant>(`${this.USERS_ENDPOINT}/${adminId}/attendants/${attendantId}.json`)
    }

    public deleteAttendant(adminId: string, attendantId: string): Observable<any>{
        return this.httpClient.delete(`${this.USERS_ENDPOINT}/${adminId}/attendants/${attendantId}.json`)
    }


}