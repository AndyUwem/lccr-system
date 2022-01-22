
import { Customer } from "../interface/customer.interface";
import { User } from "./user.entity";

export class Admin extends User{

   private companyName!: string
   private companyImage!: string
   private attendants!: []
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


     setCompanyIamge(companyImage: string){
        this.companyImage = companyImage
     }
 
     getCompanyImage(): string{
         return this.companyImage
     }

     
     setAttendants(attendants: []){
        this.attendants = attendants
     }
 
     getAttendants(): []{
         return this.attendants
     }

     
     setCustomers(customers: Array<Customer>){
        this.customers = customers
     }
 
     getCustomers(): Array<Customer>{
         return this.customers
     }
} 


