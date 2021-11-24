import { Cloth } from "./cloth.entity";

 class Customer{

    
     dateRegistered!: string
     address!: string
     cloth!: Cloth[]

    constructor(private names: string, private phone: number, private gender: string){
             this.names = names
             this.phone = phone
             this.gender = gender
    }

}


export class CustomerBuilder{

    private customer: Customer

      constructor(private names: string, private phone: number, private gender: string){
             this.customer = new Customer(names, phone, gender)
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

      build(): Customer{
        return this.customer
      }
}






