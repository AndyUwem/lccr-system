import { NgModule } from "@angular/core";
import { DashbordComponent } from "../featured/dashbord/dashbord.component";
import { TimeComponent } from './time/time.component';
import { AdvertsComponent } from './adverts/adverts.component';
import { SettingsComponent } from './settings/settings.component';
import { DeveloperComponent } from './developer/developer.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ProfileComponent } from './profile/profile.component';
import { StatusCardsComponent } from "./status-cards/status-cards.component";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminComponent } from './admin/admin.component';


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
        AdminComponent
    ],
    imports: [ 
        HttpClientModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        DashbordComponent,
        TimeComponent,
        AdvertsComponent,
        StatusCardsComponent,
        AdminComponent
    ]
})

export class FeaturedModule{}