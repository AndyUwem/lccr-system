import { NgModule } from "@angular/core";
import { DashbordComponent } from "../featured/dashbord/dashbord.component";
import { SidebarComponent } from "../featured/sidebar/sidebar.component";
import { CustomersModule } from "./customers/customers.module";
import { DashBoardRoutingModule } from "./dashbord/dashboard-routing.module";
import { StatusCardsModule } from "./status-cards/status-cards.module";
import { TimeComponent } from './time/time.component';
import { AdvertsComponent } from './adverts/adverts.component';
import { SettingsComponent } from './settings/settings.component';
import { DeveloperComponent } from './developer/developer.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
    declarations: [
        DashbordComponent,
        SidebarComponent,
        TimeComponent,
        AdvertsComponent,
        SettingsComponent,
        DeveloperComponent,
        CompanyInfoComponent,
        ProfileComponent
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