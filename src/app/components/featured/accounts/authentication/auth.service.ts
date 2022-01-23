import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { LoginData } from 'src/app/interface/login-data.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularFireAuth: Auth, private htttp: HttpClient) {}

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

  setUserAccount(loginData: LoginData): Promise<any> {
    return createUserWithEmailAndPassword(
      this.angularFireAuth,
      loginData.email,
      loginData.password
    );
  }

  saveUserToFireBase(user: any): Observable<any> {
    return this.htttp.put<any>(
      `${environment.firebase.databaseURL}/users/${user.id}.json`,
      user
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

  getAdminId(): string {
    return this.getUserRole()
      ? JSON.parse(this.getUserRef()).id
      : JSON.parse(this.getUserRef()).employerId;
  }
}
