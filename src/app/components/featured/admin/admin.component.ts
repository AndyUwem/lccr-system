import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Attendant } from 'src/app/interface/attendant.interface';
import { AttendantsService } from 'src/app/service/attendants/attendants.service';
import { AuthService } from '../accounts/authentication/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  public currentUser: any
  public contentToShow = null
  public isRegisterUser: boolean = false;
  public isAttendantScreenReady: boolean = false
  public isAttendantArrayEmpty: boolean = true
  public hasInternetConnectionError!: boolean;
  public userRole: string = 'Attendant'
  public attendants!: Array<Attendant>
  public currentAttendant!: Attendant

  @ViewChild('onlineStatusText') onlineStatusText!: ElementRef;
  @ViewChild('onlineStatusIcon') onlineStatusIcon!: ElementRef;



  constructor(
    private authService: AuthService,
    private attendantService: AttendantsService,
    private renderer2: Renderer2
    ) { }

  ngOnInit(): void {
    this.getCurrentAdmin()
    this.getAttendants()

    setTimeout( () => this.handleAttendantsOnlineStatus(), 4000)
  }
  
  ngAfterViewInit(): void {
    // this.handleAttendantsOnlineStatus();
  }

  private getCurrentAdmin(): void {
     this.currentUser = JSON.parse(this.authService.getUserRef())
  }

  private getAttendants(): void{
       this.attendantService
       .findAllAttendants(this.authService.getAdminId)
       .subscribe({
         next: (attendants: Array<Attendant>) => {
            this.isAttendantScreenReady = true
            if(attendants.length > 0){
              this.attendants = attendants
              this.setCurrentAttendant(attendants[0])
              this.isAttendantArrayEmpty = false
            }
            else this.isAttendantArrayEmpty = true
          },
         error: (err) => this.hasInternetConnectionError = true
       })
  }

  private handleAttendantsOnlineStatus(): void {
        this.renderer2.setStyle(this.onlineStatusText.nativeElement, 'color', 'green');
  }


  public setCurrentAttendant(attendant: Attendant): void {
      this.currentAttendant = attendant
  }

  public deleteAttendant(): void {
       const indexOfAttendant = this.attendants.indexOf(this.currentAttendant)
       this.attendants.splice(indexOfAttendant, 1)
       this.attendantService
       .deleteAttendant(this.authService.getAdminId, this.currentAttendant.id)
       .subscribe({
         next: () => {
           this.getAttendants();
           console.log('deleted sucessfully!')
         },
         error: (err) => console.log('Unsucessfull could not delete attendant: ', err.message)
       })

       
  }


  public navigateToRegisterPage(): void {
    this.isRegisterUser = true;
  }

 public navigateBackToAdminPanel(booleanEventValue: any): void {
    this.getAttendants()
    this.isRegisterUser = booleanEventValue;
  }


}
