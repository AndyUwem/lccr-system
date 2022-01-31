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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      this.getCurrentUser()
  }

  private getCurrentUser(): void {
    if(!this.currentAttendant) {
      const user = JSON.parse(this.authService.getUserRef())
            this.currentAttendant = user
       }
   }


}
