import { NgModule } from "@angular/core";
import { DashbordComponent } from "../featured/dashbord/dashbord.component";
import { DashBoardRoutingModule } from "./dashbord/dashboard-routing.module";
import { TimeComponent } from './time/time.component';
import { AdvertsComponent } from './adverts/adverts.component';
import { SettingsComponent } from './settings/settings.component';
import { DeveloperComponent } from './developer/developer.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ProfileComponent } from './profile/profile.component';
import { StatusCardComponent } from "./status-cards/status-card/status-card.component";
import { StatusCardsComponent } from "./status-cards/status-cards.component";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        DashbordComponent,
        TimeComponent,
        AdvertsComponent,
        SettingsComponent,
        DeveloperComponent,
        CompanyInfoComponent,
        ProfileComponent,
        StatusCardsComponent,
        StatusCardComponent
    ],
    imports: [ DashBoardRoutingModule, HttpClientModule],
    exports: [
        DashbordComponent,
        TimeComponent,
        AdvertsComponent,
        StatusCardsComponent,
        StatusCardComponent,
    ]
})

export class FeaturedModule{}