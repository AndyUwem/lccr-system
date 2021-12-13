import { Cloth } from "../interface/cloth.interface";
import { Payment } from "./payment.entity";


   class Customer{

     names!: string;
     phone!: number ;
     gender!: string;
     dateRegistered!: string;
     address!: string;
     cloth!: Cloth[];
     payments!: Payment[];

    constructor(){}

}


export class CustomerBuilder{

    private customer: Customer

      constructor(){
             this.customer = new Customer()
      }
  
      setNames(names: string): CustomerBuilder{
         this.customer.names = names
         return this
      }
      
      
      setPhone(phone: number): CustomerBuilder{
         this.customer.phone = phone
         return this
      }

      
      setGender(gender: string): CustomerBuilder{
         this.customer.gender = gender
         return this
      }


      setDateRegistered(dateRegistered: string): CustomerBuilder{
         this.customer.dateRegistered = dateRegistered
         return this
      }
  

 
      setAdress(address: string): CustomerBuilder{
         this.customer.address = address
         return this
      }
  
 
      setCloth(cloth: Cloth[]): CustomerBuilder{
         this.customer.cloth = cloth
         return this
      }

      setPayments(payments: Payment[]): CustomerBuilder{
         this.customer.payments = payments
         return this
      }

      build(): Customer{
        return this.customer
      }
}






