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
    this.getPerfectMatch();
  }

  public getFavorites(): void {
    this.recipesService.getFavorites().subscribe((data) => {
      if (data.length) {
        this.favorites = data;
      }
    });
  }

  public getPerfectMatch(): void {
    this.recipesService.getPerfectMatch().subscribe((data) => {
      if (data.length) {
        console.log(data);

        this.perfectMatch = data;
      }
    });
  }

  public redirectToAdd(): void {
    console.log("add");
  }

  public redirectToAllRecipes(): void {
    console.log("all");
  }
}
