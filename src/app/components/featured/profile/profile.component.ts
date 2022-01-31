import { Component, Input, OnInit } from '@angular/core';
import { Attendant } from 'src/app/interface/attendant.interface';
import { AuthService } from '../accounts/authentication/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input('currentAttendant') currentAttendant!: Attendant
  public isUserAdministrator!: boolean;
  

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      this.getCurrentUser()
      this.getUserRole()
  }

  private getCurrentUser(): void {
    if(!this.currentAttendant) {
      const user: Attendant = JSON.parse(this.authService.getUserRef())
            this.currentAttendant = user
       }
   }

   private getUserRole(): void{
     this.isUserAdministrator = this.authService.isUserAdministrator()
   }

}
