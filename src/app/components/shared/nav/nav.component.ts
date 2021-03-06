import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../featured/accounts/authentication/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public user: any;
  public adminId!: string;
  public isAdmin!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
     this.handleUserData()
  }

  logOutUser(): void {
    this.authService.logOutUser()
    this.router.navigate(['login'])
  }


    private handleUserData(): void {
      this.user = JSON.parse(this.authService.getUserRef())
      this.adminId = this.authService.getAdminId
      this.isAdmin = this.authService.isUserAdministrator()
    }


}
