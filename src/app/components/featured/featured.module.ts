import { NgModule } from "@angular/core";
import { DashbordComponent } from "../featured/dashbord/dashbord.component";
import { SidebarComponent } from "../featured/sidebar/sidebar.component";


@NgModule({
    declarations: [
        DashbordComponent,
        SidebarComponent
    ],
    imports: [],
    exports: [
        DashbordComponent,
        SidebarComponent,
 
    ]
})

export class FeaturedModule{}