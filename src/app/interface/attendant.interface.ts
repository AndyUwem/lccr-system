import { LoginData } from "./login-data.interface";

export interface Attendant{
     employerId: string
     id: string;
     names: string
     age: number
     phone : number
     gender : string
     dateRegistered: Date
     address: string
     onlineStatus: string
     userRole: string 
     userAccount: LoginData
}