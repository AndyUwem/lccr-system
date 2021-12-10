import { Payment } from "./payment.entity";

export class Cloth {


    constructor(
        private clothName: string,
        private clothColor: string,
        private clothCategory: string,
        private serviceType: string,
        private deliveryStatus: string,
        private clothStatus: string,
        private pickUpDate: string,
        private description: string,
        private cost: string,
       
        )
    {
       this.clothName = clothName
       this.clothColor = clothColor
       this.clothCategory = clothCategory
       this.serviceType = serviceType
       this.deliveryStatus = deliveryStatus
       this.clothStatus = clothStatus
       this.pickUpDate = pickUpDate
       this.description = description
       this.cost = cost
    }

}