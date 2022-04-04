import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'filterCustomer'
})


export class FilterCustomerPipe implements PipeTransform {

    transform(customers: any[], enteredValue: string, propertyToFilter: any): any[]{
        if (!customers || !enteredValue) { return customers }
         
         return customers.filter( customer =>  customer[propertyToFilter].indexOf(enteredValue.toLowerCase())  != -1)
    }



}