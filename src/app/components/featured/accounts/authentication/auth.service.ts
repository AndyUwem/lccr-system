import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { LoginData } from 'src/app/interface/login-data.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
      private angularFireAuth: Auth, 
      private htttp: HttpClient
      ) {}

 public setUserToken(token: string) {
    localStorage.setItem('myToken', token);
  }

  public getUserToken(): string | null {
    return localStorage.getItem('myToken');
  }

  public isUserLoggedIn(): boolean {
    return this.getUserToken() !== null;
  }

  public logInUser(loginData: LoginData): Promise<any> {
    return signInWithEmailAndPassword(
      this.angularFireAuth,
      loginData.email,
      loginData.password
    );
  }

  public logOutUser(): void {
    localStorage.clear();
  }

  public setUserFirebaseLogin(loginData: LoginData): Promise<any> {
    return createUserWithEmailAndPassword(
      this.angularFireAuth,
      loginData.email,
      loginData.password
    );
  }


  public setUserREf(currentUser: any): void {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  public getUserRef(): any {
    return localStorage.getItem('currentUser');
  }

  public isUserAdministrator(): boolean {
    const user = JSON.parse(this.getUserRef());
    return user.userRole === 'Administrator' ? true : false;
  }

  public get getAdminId(): string {
    return this.isUserAdministrator()
      ? JSON.parse(this.getUserRef()).id
      : JSON.parse(this.getUserRef()).employerId;
  }



}
