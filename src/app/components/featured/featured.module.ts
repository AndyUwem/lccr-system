import { NgModule } from "@angular/core";
import { DashbordComponent } from "../featured/dashbord/dashbord.component";
import { SidebarComponent } from "../featured/sidebar/sidebar.component";
import { CustomersModule } from "./customers/customers.module";
import { StatusCardsModule } from "./status-cards/status-cards.module";
import { TimeComponent } from './time/time.component';


@NgModule({
    declarations: [
        DashbordComponent,
        SidebarComponent,
        TimeComponent
    ],
    imports: [CustomersModule, StatusCardsModule],
    exports: [
        DashbordComponent,
        SidebarComponent,
        TimeComponent
    ]
})

export class FeaturedModule{}