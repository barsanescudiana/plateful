import { Component, Input, OnInit } from "@angular/core";
import { RecipesService } from "../../services/recipes.service";
import { User } from "src/app/interfaces/user.interface";
import { Recipe } from "src/app/interfaces/recipe.interface";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-recipe-card",
  templateUrl: "./recipe-card.component.html",
  styleUrls: ["./recipe-card.component.scss"],
  host: {
    "[attr.data-image-url]": "imageUrl", // Set the data attribute to hold the image URL
  },
})
export class RecipeCardComponent implements OnInit {
  private user: User | undefined;
  imageUrl: string =
    "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg";
  @Input() recipe: Recipe | any;
  public shortTitle: string = "";
  public isFavorite = false;
  public availableIngredients: number = 0;

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);
    this.imageUrl = this.recipe.image;

    if (this.recipe.title.length > 40) {
      this.shortTitle = this.recipe.title.substring(0, 40) + "...";
    } else {
      this.shortTitle = this.recipe.title;
    }

    this.isFavorite = this.recipe.isFavorite;
    this.getAvailableIngredients();

    console.log(this.recipe.extendedIngredients);
  }

  public addToFavorites(): void {
    this.recipesService.addToFavorites(this.recipe).subscribe((data) => {
      if (data) {
        this.isFavorite = true;
      }
    });
  }

  private getAvailableIngredients(): void {
    this.user?.products.forEach((item) => {
      if (this.recipe.extendedIngredients) {
        this.recipe.extendedIngredients.forEach((ingredient: any) => {
          if (
            ingredient.name.toLowerCase().includes(item.name?.toLowerCase()) ||
            item.name?.toLowerCase().includes(ingredient.name.toLowerCase())
          ) {
            this.availableIngredients += 1;
          }
        });
      }
    });
  }

  public handleCardClick() {
    this.router.navigate([`recipes/${this.recipe.id}`]);
  }
}
