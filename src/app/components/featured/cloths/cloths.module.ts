import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ClothsListComponent } from "./cloths-list/cloths-list.component";

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [ClothsListComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        ScrollingModule
    ],
    exports: [ClothsListComponent]
})

export class ClothsModule {

}