import { User } from "./user.entity";

export class Admin extends User{

   private companyName!: string

   
      constructor(){
          super()
      }

      setCompanyName(companyName: string){
        this.companyName = companyName
     }
 
     getCompanyName(): string{
         return this.companyName
     }

} 


