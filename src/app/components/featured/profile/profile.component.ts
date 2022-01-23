import { Component, OnInit } from '@angular/core';
import { AuthService } from '../accounts/authentication/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserData()
  }


  private getUserData(): void {
    this.user = JSON.parse(this.authService.getUserRef())
  }

}
