import { Pipe, PipeTransform } from "@angular/core";
import { formatNumberToCurrency } from "../service/payments/paymentsHelper.service";


@Pipe({
    name: 'customCurrency'
})

export class CurrencyCoverterPipe implements PipeTransform{
    
     transform(value: string, currency: string): string {
         return formatNumberToCurrency(parseInt(value), currency)
     }


}