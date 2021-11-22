export class Payment{

    private id!: number;
    private date!: Date;
    private amountPaid!: number;
    private balanceOfPayment!: number;
    private isOwing!: boolean
    private totalPayment!: number

    constructor(){}

    setId(id: number){
        this.id = id
     }
 
     getId(): number{
         return this.id
     }
 
     setDate(date: Date){
         this.date = date
      }
  
      getDate(): Date{
          return this.date
      }
 
      setAmountPaid(amountPaid: number){
         this.amountPaid = amountPaid
      }
  
      getAmountPaid(): number{
          return this.amountPaid
      }
 
 
      setBalanceOfPayment(balanceOfPayment: number){
         this.balanceOfPayment = balanceOfPayment
      }
  
      getBalanceOfPayment(): number{
          return this.balanceOfPayment
      }
 
 
      setIsOwing(isOwing: boolean){
         this.isOwing = isOwing
      }
  
      getIsOwing(): boolean{
          return this.isOwing
      }

      
      setTotalPayment(totalPayment: number){
        this.totalPayment = totalPayment
     }
 
     getTotalPayment(): number{
         return this.totalPayment
     }


 
}