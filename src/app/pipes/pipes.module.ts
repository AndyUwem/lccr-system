import { NgModule } from "@angular/core";
import { CurrencyCoverterPipe } from "./currency-converter.pipe";
import { FilterCustomerPipe } from "./filter-customer.pipe";

@NgModule({

     declarations: [ CurrencyCoverterPipe, FilterCustomerPipe],

     exports: [CurrencyCoverterPipe, FilterCustomerPipe]
})


export class CustomPipesModule{

}