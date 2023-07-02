import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RecipesService } from "../../services/recipes.service";

@Component({
  selector: "app-recipe-overview",
  templateUrl: "./recipe-overview.component.html",
  styleUrls: ["./recipe-overview.component.scss"],
})
export class RecipeOverviewComponent implements OnInit {
  public recipe: any;
  public showIngredients = false;
  public showInstructions = false;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.params["recipeId"];
    if (recipeId) {
      this.recipesService.getRecipeById(recipeId).subscribe((data: any) => {
        this.recipe = data;
        console.log(this.recipe);
      });
    }
  }

  public openIngredientsArea(): void {
    this.showIngredients = !this.showIngredients;
  }

  public toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }
}
