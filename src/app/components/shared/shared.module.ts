import { NgModule } from "@angular/core";
import { AppComponent } from "src/app/app.component";
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
    imports: [],
    exports: [
        AppComponent,
        NavComponent,
        BodyComponent,
        FooterComponent
    ]
})

export class SharedModule {}