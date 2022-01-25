import { Component, OnInit } from '@angular/core';
import { AuthService } from '../accounts/authentication/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public currentUser: any
  public contentToShow = null
  public isRegisterUser: boolean = false;
  public userRole: string = 'Attendant'

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  private getCurrentUser(): void {
     this.currentUser = JSON.parse(this.authService.getUserRef())
  }

  navigateToRegisterPage(): void {
    this.isRegisterUser = true;
  }

  navigateBackToAdminPanel(booleanEventValue: any): void {
    this.isRegisterUser = booleanEventValue;
  }


}
