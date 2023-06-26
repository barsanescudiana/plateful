import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListItemComponent } from "./components/shopping-list-item/shopping-list-item.component";
import { SharedModule } from "src/app/components/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from "@angular/material/checkbox";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  exports: [ShoppingListComponent, ShoppingListItemComponent],
})
export class ShoppingListModule {}
