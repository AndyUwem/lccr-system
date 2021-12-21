import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClothsListComponent } from "./cloths-list/cloths-list.component";

@NgModule({
    declarations: [ClothsListComponent],
    imports: [CommonModule],
    exports: [ClothsListComponent]
})

export class ClothsModule {

}