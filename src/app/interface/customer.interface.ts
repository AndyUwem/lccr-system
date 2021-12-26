import { Cloth } from "./cloth.interface";



export interface Customer {
    id: string
    names: string
    phone: number,
    gender: string
    dateRegistered: string;
    address: string;
    cloth: Cloth[] ;
    payments: [];

}