import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdvertsComponent } from "../adverts/adverts.component";
import { CustomersComponent } from "../customers/customers.component";

const routes: Routes =  [
      { path: '', component: AdvertsComponent, pathMatch: 'full' },
      { path: 'home', component: AdvertsComponent },
      { path: 'customers', component: CustomersComponent}

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class DashBoardRoutingModule{}