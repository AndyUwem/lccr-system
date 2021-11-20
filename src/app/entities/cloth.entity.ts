import { Payment } from "./payment.entity";

export class Cloth {

    private id!: number;
    private name!: string;
    private color!: string;
    private type!: string;
    private delivered!: boolean;
    private clothStatus!: string
    private pickUpDate!: Date
    private payment!: Payment;

    constructor(){}

    setId(id: number){
        this.id = id
     }
 
     getId(): number{
         return this.id
     }

    getName(): string{
        return this.name
    }

    setColor(color: string){
       this.color = color
    }

    getColor(): string{
        return this.color
    }


    setType(type: string){
       this.type = type
    }

    getType(): string{
        return this.type
    }


    setDelivered(delivered: boolean){
       this.delivered = delivered
    }

    getDelivered(): boolean{
        return this.delivered
    }


    setClothStatus(clothStatus: string){
       this.clothStatus = clothStatus
    }

    getClothStatus(): string{
        return this.clothStatus
    }

    
    setPickUpDate(pickUpDate: Date){
        this.pickUpDate = pickUpDate
     }
 
     getPickUpDate(): Date{
         return this.pickUpDate
     }

     
     setPayment(payment: Payment){
        this.payment = payment
     }
 
     getPayment(): Payment{
         return this.payment
     }

}