import { Component, OnInit } from '@angular/core';
import { Attendant } from 'src/app/interface/attendant.interface';
import { AttendantsService } from 'src/app/service/attendants/attendants.service';
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
  public isAttendantScreenReady: boolean = false
  public userRole: string = 'Attendant'
  public attendants!: Array<Attendant>
  public currentAttendant!: Attendant

  constructor(
    private authService: AuthService,
    private attendantService: AttendantsService
    ) { }

  ngOnInit(): void {
    this.getCurrentAdmin()
    this.getAttendants()
  }

  private getCurrentAdmin(): void {
     this.currentUser = JSON.parse(this.authService.getUserRef())
  }

  private getAttendants(): void{
       this.attendantService
       .findAllAttendants(this.authService.getAdminId())
       .subscribe({
         next: (attendants: Array<Attendant>) => {
           this.attendants = attendants
           this.setCurrentAttendant(attendants[0])
           this.isAttendantScreenReady = true
          },
         error: (err) => console.log(err.message)
       })
  }

  public setCurrentAttendant(attendant: Attendant): void {
      this.currentAttendant = attendant
  }

  public deleteAttendant(): void {
       const indexOfAttendant = this.attendants.indexOf(this.currentAttendant)
       this.attendants.splice(indexOfAttendant, 1)
       this.getAttendants();
  }


  navigateToRegisterPage(): void {
    this.isRegisterUser = true;
  }

  navigateBackToAdminPanel(booleanEventValue: any): void {
    this.getAttendants()
    this.isRegisterUser = booleanEventValue;
  }


}
