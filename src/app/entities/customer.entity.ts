import { Cloth } from "./cloth.entity";

export class Customer{

    private id!: number;
    private names!: string
    private dateRegistered!: Date
    private phone!: number
    private address!: string
    private cloth!: Cloth[]


    constructor(){}


      setId(id: number){
       this.id = id
    }

    getId(): number{
        return this.id
    }

    setNames(names: string){
        this.names = names
     }
 
     getNames(): string{
         return this.names
     }

     setDateRegistered(dateRegistered: Date){
        this.dateRegistered = dateRegistered
     }
 
     getDateRegistered(): Date{
         return this.dateRegistered
     }

     setPhone(phone: number){
        this.phone = phone
     }
 
     getPhone(): number{
         return this.phone
     }

     setAdress(address: string){
        this.address = address
     }
 
     getAdress(): string{
         return this.address
     }


     setCloth(cloth: Cloth[]){
        this.cloth = cloth
     }
 
     getCloth(): Cloth[]{
         return this.cloth
     }


}