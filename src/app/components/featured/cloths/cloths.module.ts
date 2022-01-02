import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ClothsListComponent } from "./cloths-list/cloths-list.component";

@NgModule({
    declarations: [ClothsListComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [ClothsListComponent]
})

export class ClothsModule {

}