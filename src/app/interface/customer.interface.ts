import { Cloth } from "../entities/cloth.entity"


export interface Customer {

    names: string
    phone: number,
    gender: string
    dateRegistered: string;
    address: string;
    cloth: Cloth[] ;
    payments: [];

}