import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { PantryComponent } from "./pantry.component";
import { SharedModule } from "src/app/components/shared.module";
import { PantryMenuComponent } from "./components/pantry-menu/pantry-menu.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { AddProductDialogComponent } from "./components/add-product-dialog/add-product-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { FilterComponent } from './components/filter/filter.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
  declarations: [
    PantryComponent,
    PantryMenuComponent,
    ProductCardComponent,
    AddProductDialogComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
  ],
  exports: [PantryComponent, ProductCardComponent, PantryMenuComponent, FilterComponent],
  providers: [DatePipe],
})
export class PantryModule {}
