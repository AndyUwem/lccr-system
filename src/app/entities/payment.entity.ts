export class Payment{

    
    private date!: string;
    private amountPaid!: number;
    private balanceOfPayment!: number;
    private isOwing!: boolean
    private totalPayment!: number

    constructor(){}

     setDate(date: string){
         this.date = date
      }
  
  
 
      setAmountPaid(amountPaid: number){
         this.amountPaid = amountPaid
      }
  
    
 
 
      setBalanceOfPayment(balanceOfPayment: number){
         this.balanceOfPayment = balanceOfPayment
      }
  
    
 
 
      setIsOwing(isOwing: boolean){
         this.isOwing = isOwing
      }
  

      
      setTotalPayment(totalPayment: number){
        this.totalPayment = totalPayment
     }
 


 
}