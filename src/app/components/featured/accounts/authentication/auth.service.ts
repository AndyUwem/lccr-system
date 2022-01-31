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

  setUserToken(token: string) {
    localStorage.setItem('myToken', token);
  }

  getUserToken(): string | null {
    return localStorage.getItem('myToken');
  }

  isUserLoggedIn(): boolean {
    return this.getUserToken() !== null;
  }

  logInUser(loginData: LoginData): Promise<any> {
    return signInWithEmailAndPassword(
      this.angularFireAuth,
      loginData.email,
      loginData.password
    );
  }

  logOutUser(): void {
    localStorage.clear();
  }

  setUserFirebaseLogin(loginData: LoginData): Promise<any> {
    return createUserWithEmailAndPassword(
      this.angularFireAuth,
      loginData.email,
      loginData.password
    );
  }


  setUserREf(currentUser: any): void {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  getUserRef(): any {
    return localStorage.getItem('currentUser');
  }

  getUserRole(): boolean {
    const user = JSON.parse(this.getUserRef());
    return user.userRole === 'Administrator' ? true : false;
  }

  public get getAdminId(): string {
    return this.getUserRole()
      ? JSON.parse(this.getUserRef()).id
      : JSON.parse(this.getUserRef()).employerId;
  }



}
