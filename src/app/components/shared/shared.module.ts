import { NgModule } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { AccountsModule } from "../featured/accounts/accounts.module";
import { FeaturedModule } from "../featured/featured.module";
import { BodyComponent } from "./body/body.component";
import { FooterComponent } from "./footer/footer.component";
import { NavComponent } from "./nav/nav.component";


@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        BodyComponent,
        FooterComponent

    ],
    imports: [AccountsModule, FeaturedModule],
    exports: [
        AppComponent,
        NavComponent,
        BodyComponent,
        FooterComponent
    ]
})

export class SharedModule {}