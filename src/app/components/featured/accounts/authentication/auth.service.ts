import { Injectable } from "@angular/core";
import { of, Observable, throwError } from 'rxjs'
@Injectable({
    providedIn: 'root'
})


export class AuthService {

    constructor(){}

     setUserToken(token: string){
          localStorage.setItem('myToken', token)
      }

     getUserToken(): string| null {
         return localStorage.getItem('myToken')
     }

     isUserLoggedIn(): boolean{
         return this.getUserToken() !== null
     }


     logInUser({ userId, password }: any): Observable<any> {
            if( userId === 'andy' && password === '12345'){
                this.setUserToken('ZWEWDEJHHE6FB780032XBNHJUAQW12A')
              return of({ names: 'andy uwem essien', phone: '0909983784736' })
              } 
            return throwError(()=> new Error('failed to login! invalid email or password'))
     }


     logOutUser(): void {
       localStorage.removeItem('myToken')
     }

}