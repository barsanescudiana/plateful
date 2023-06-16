import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PantryComponent } from './pantry.component';
import { SharedModule } from 'src/app/components/shared.module';
import { PantryMenuComponent } from './components/pantry-menu/pantry-menu.component';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [
    PantryComponent,
    PantryMenuComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PantryComponent
  ]
})
export class PantryModule { }
