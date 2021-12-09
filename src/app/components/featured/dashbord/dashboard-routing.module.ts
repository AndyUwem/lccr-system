import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdvertsComponent } from "../adverts/adverts.component";
import { CompanyInfoComponent } from "../company-info/company-info.component";
import { DeveloperComponent } from "../developer/developer.component";
import { ProfileComponent } from "../profile/profile.component";
import { SettingsComponent } from "../settings/settings.component";

const routes: Routes =  [
      { path: '', component: AdvertsComponent, pathMatch: 'full' },
      { path: 'home', component: AdvertsComponent },
      { path: 'profile', component: ProfileComponent},
      { path: 'settings', component: SettingsComponent},
      { path: 'developer', component: DeveloperComponent},
      { path: 'company', component: CompanyInfoComponent},
      { path: 'customers', loadChildren: ()=> import('../customers/customers.module').then( m => m.CustomersModule) },
      { path: '**', redirectTo: '/home', pathMatch: 'full'}

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class DashBoardRoutingModule{}