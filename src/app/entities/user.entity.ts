import { Account } from "./account.entity";

export class User{
     private id!: number;
     private name!: string
     private age!: number
     private dateRegistered!: Date
     private address!: string
     private userType!: string 
     private account!: Account

    constructor(){}


    setId(id: number){
       this.id = id
    }

    getId(): number{
        return this.id
    }

    setName(name: string){
        this.name = name
     }
 
     getName(): string{
         return this.name
     }

     setAge(age: number){
        this.age = age
     }
 
     getAge(): number{
         return this.age
     }


     setDateRegistered(dateRegistered: Date){
        this.dateRegistered = dateRegistered
     }
 
     getDateRegistered(): Date{
         return this.dateRegistered
     }


     setAdress(address: string){
        this.address = address
     }
 
     getAdress(): string{
         return this.address
     }


     setUserType(userType: string){
        this.userType = userType
     }
 
     getUserType(): string{
         return this.userType
     }
}