import { NgModule } from "@angular/core";
import { DashbordComponent } from "../featured/dashbord/dashbord.component";
import { SidebarComponent } from "../featured/sidebar/sidebar.component";
import { CustomersModule } from "./customers/customers.module";
import { DashBoardRoutingModule } from "./dashbord/dashboard-routing.module";
import { StatusCardsModule } from "./status-cards/status-cards.module";
import { TimeComponent } from './time/time.component';
import { AdvertsComponent } from './adverts/adverts.component';


@NgModule({
    declarations: [
        DashbordComponent,
        SidebarComponent,
        TimeComponent,
        AdvertsComponent
    ],
    imports: [CustomersModule, StatusCardsModule, DashBoardRoutingModule],
    exports: [
        DashbordComponent,
        SidebarComponent,
        TimeComponent,
        AdvertsComponent
    ]
})

export class FeaturedModule{}