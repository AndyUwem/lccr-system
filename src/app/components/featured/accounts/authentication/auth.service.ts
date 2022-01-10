import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})


export class AuthService {

    constructor(private router: Router){}

     setUserToken(token: string){
          localStorage.setItem('myToken', token)
      }

     getUserToken(): string| null {
         return localStorage.getItem('myToken')
     }

     isUserLoggedIn(): boolean{
         return this.getUserToken() !== null
     }


     loginUser( obj: any): void {
            if( obj.userId === 'andy' && obj.password === '12345'){
                this.setUserToken('ZWEWDEJHHE6FB780032XBNHJUAQW12A')
                this.router.navigate(['home'])
            }
                 
            
              else 
              alert('email or password incorrect!!!!')

     }
}