export class Payment{

    
    private date!: string;
    private amountPaid!: number;
    private balanceOfPayment!: number;
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
  
      
      setTotalPayment(totalPayment: number){
        this.totalPayment = totalPayment
     }
 


 
}