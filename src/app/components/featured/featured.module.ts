import { NgModule } from "@angular/core";
import { DashbordComponent } from "../featured/dashbord/dashbord.component";
import { TimeComponent } from './time/time.component';
import { AdvertsComponent } from './adverts/adverts.component';
import { DeveloperComponent } from './developer/developer.component';
import { ProfileComponent } from './profile/profile.component';
import { StatusCardsComponent } from "./status-cards/status-cards.component";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { AccountsModule } from "./accounts/accounts.module";
import { LoadingComponent } from './loading/loading.component';


@NgModule({
    declarations: [
        DashbordComponent,
        TimeComponent,
        AdvertsComponent,
        DeveloperComponent,
        ProfileComponent,
        StatusCardsComponent,
        AdminComponent,
        LoadingComponent
    ],
    imports: [ 
        HttpClientModule,
        CommonModule,
        RouterModule,
        AccountsModule
    ],
    exports: [
        DashbordComponent,
        TimeComponent,
        AdvertsComponent,
        StatusCardsComponent,
        AdminComponent,
        LoadingComponent
    ]
})

export class FeaturedModule{}