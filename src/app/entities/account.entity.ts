export class Account{

    private email!: string
    private phone!: number
    private password!: number
    private loginDate!: Date
    private loginStatus!: boolean


    constructor(){}


    setEmail(email: string){
        this.email = email
     }
 
     getEmail(): string{
         return this.email
     }
 
     setPhone(phone: number){
         this.phone = phone
      }
  
      getPhone(): number{
          return this.phone
      }
 
      setPassword(password: number){
         this.password = password
      }
  
      getPassword(): number{
          return this.password
      }
 
 
      setLoginDate(loginDate: Date){
         this.loginDate = loginDate
      }
  
      getLoginDate(): Date{
          return this.loginDate
      }
 
 
      setLoginStatus(loginStatus: boolean){
         this.loginStatus = loginStatus
      }
  
      getLoginStatus(): boolean{
          return this.loginStatus
      }
 
}