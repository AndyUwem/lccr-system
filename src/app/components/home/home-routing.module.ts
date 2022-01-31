import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountsModule } from "../featured/accounts/accounts.module";
import { AuthGuard } from "../featured/accounts/guards/auth.guard";
import { UserLoginComponent } from "../featured/accounts/user-login/user-login.component";
import { AdvertsComponent } from "../featured/adverts/adverts.component";
import { DeveloperComponent } from "../featured/developer/developer.component";
import { ProfileComponent } from "../featured/profile/profile.component";
import { BodyComponent } from "../shared/body/body.component";
import { SharedModule } from "../shared/shared.module";



const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
         path: 'home', canActivate: [AuthGuard],
         component: BodyComponent,
         children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdvertsComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'developer', component: DeveloperComponent },
            { path: 'customers', loadChildren: () => import('../featured/customers/customers.module').then(m => m.CustomersModule) },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
         ]
        },
    { path: 'login', component: UserLoginComponent },  
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
    declarations: [],

imports: [
       RouterModule.forRoot(routes),
       AccountsModule,
       SharedModule
    ],

    exports: [ RouterModule ],

   providers: [AuthGuard]
})

export class HomeRoutingModule{

}