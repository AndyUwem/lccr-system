import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ClothsListComponent } from "./cloths-list/cloths-list.component";

import { ScrollingModule } from '@angular/cdk/scrolling';
import { NewClothComponent } from './new-cloth/new-cloth.component';

@NgModule({
    declarations: [ClothsListComponent, NewClothComponent],
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        ScrollingModule
    ],
    exports: [ClothsListComponent, ClothsListComponent]
})

export class ClothsModule {

}