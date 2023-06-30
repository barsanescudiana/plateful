import { Component, OnInit } from "@angular/core";
import { Recipe } from "src/app/interfaces/recipe.interface";
import { RecipesService } from "./services/recipes.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"],
})
export class RecipesComponent implements OnInit {
  public favorites: Recipe[] | any;
  public perfectMatch: Recipe[] | any;

  noFavoritesText: string = "";

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  public getFavorites(): void {
    this.recipesService.getFavorites().subscribe((data) => {
      if (data.length) {
        this.favorites = data;
      } else {
        this.noFavoritesText = data;
      }
    });
  }
}
