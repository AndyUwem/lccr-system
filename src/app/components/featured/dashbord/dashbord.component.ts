import { Component, OnInit } from '@angular/core';
import { AuthService } from '../accounts/authentication/auth.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  public isAdmin: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
     this.isAdmin = this.getUserRole()
  }


  private getUserRole(): boolean {
    return this.authService.getUserRole()
  }



}
