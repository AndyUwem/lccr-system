import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FeaturedModule } from "../featured/featured.module";
import { BodyComponent } from "./body/body.component";
import { FooterComponent } from "./footer/footer.component";
import { NavComponent } from "./nav/nav.component";


@NgModule({
    declarations: [
        NavComponent,
        BodyComponent,
        FooterComponent
     ],
    imports: [
       FeaturedModule,
       CommonModule
     ],
     exports: [
        NavComponent,
        BodyComponent,
        FooterComponent
     ]

})

export class SharedModule {}