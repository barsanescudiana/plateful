import { Component } from "@angular/core";
import { Recipe } from "src/app/interfaces/recipe.interface";
import { RecipesService } from "./services/recipes.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"],
})
export class RecipesComponent {
  public favorites: Recipe[] | any;
  public perfectMatch: Recipe[] | any;

  constructor(private recipesService: RecipesService) {}
}
