import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RecipesComponent } from "./recipes.component";
import { RecipeCardComponent } from "./components/recipe-card/recipe-card.component";
import { RecipeOverviewComponent } from "./components/recipe-overview/recipe-overview.component";
import { SharedModule } from "src/app/components/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeCardComponent,
    RecipeOverviewComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [RecipesComponent, RecipeCardComponent, RecipeOverviewComponent],
})
export class RecipesModule {}
