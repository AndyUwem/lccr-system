import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/interface/user.interface";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class AttendantsService{

     constructor(private httpClient: HttpClient){}

     AddNewAttendant(uId: string, attendant: User): Observable<any> {
         return this.httpClient.post<any>(`${environment.firebase.databaseURL}/users/${uId}/attendants.json`, attendant)
     }


}