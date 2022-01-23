
import { Customer } from "../interface/customer.interface";
import { User } from "./user.entity";

export class Admin extends User{

   private companyName!: string
   private companyImage!: File
   private attendants!: Array<User>
   private customers!: Array<Customer>

   
      constructor(){
          super()
      }

      setCompanyName(companyName: string){
        this.companyName = companyName
     }
 
     getCompanyName(): string{
         return this.companyName
     }


     setCompanyIamge(companyImage: File){
        this.companyImage = companyImage
     }
 
     getCompanyImage(): File{
         return this.companyImage
     }

     
     setAttendants(attendants: Array<User>){
        this.attendants = attendants
     }
 
     getAttendants(): Array<User>{
         return this.attendants
     }

     
     setCustomers(customers: Array<Customer>){
        this.customers = customers
     }
 
     getCustomers(): Array<Customer>{
         return this.customers
     }
} 


