import { Payment } from "./payment.entity";

export class Cloth {


    constructor(
        private name: string,
        private color: string,
        private type: string,
        private delivered: boolean,
        private clothStatus: string,
        private pickUpDate: String,
        private payment: Payment
        )
    {
       this.name = name
       this.color = color
       this.type = type
       this.delivered = delivered
       this.clothStatus = clothStatus
       this.pickUpDate =pickUpDate
       this.payment = payment
    }

}