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

     AddNewAttendant(uId: any, attendant: User): Observable<User> {
         return this.httpClient.patch<User>(`${environment.firebase.databaseURL}/users/${uId}.json`, attendant)
     }


}