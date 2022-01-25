import { LoginData } from "../interface/login-data.interface";

export class User{
     private id!: number;
     private names!: string
     private age!: number
     private phone! : number
     private gender! : string
     private dateRegistered!: Date
     private address!: string
     private userRole!: string 
     private userAccount!: LoginData 
    

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

     setAge(age: number){
        this.age = age
     }
 
     getAge(): number{
         return this.age
     }

     setPhone(phone: number){
        this.phone = phone
     }
 
     getPhone(): number{
         return this.phone
     }

     setGender(gender: string){
        this.gender = gender
     }
 
     getGender(): string{
         return this.gender
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


     setUserRole(userRole: string){
        this.userRole = userRole
     }
 
     getUserRole(): string{
         return this.userRole
     }

     
     setUserAccount(userAccount: LoginData){
        this.userAccount = userAccount
     }
 
     getUserAccount(): LoginData{
         return this.userAccount
     }
     
}