import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class AdminService{

     constructor(private httpClient: HttpClient){}

     registerAdminToFireBase(admin: any): Observable<any> {
        return this.httpClient.put<any>(
          `${environment.firebase.databaseURL}/users/${admin.id}.json`,
          admin
        );
      }

      getAdminFromFireBase(uId: any): Observable<any> {
        return this.httpClient.get<any>(
          `${environment.firebase.databaseURL}/users/${uId}.json`
        );
      }

}