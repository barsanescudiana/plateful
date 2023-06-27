import { Component, Input, OnInit } from "@angular/core";
import { RecipesService } from "../../services/recipes.service";
import { User } from "src/app/interfaces/user.interface";
import { Recipe } from "src/app/interfaces/recipe.interface";

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
  public shortTitle: string = '';

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);
    this.imageUrl = this.recipe.image;

    if (this.recipe.title.length > 40) {
      this.shortTitle = this.recipe.title.substring(0, 40) + '...'
    } else {
      this.shortTitle = this.recipe.title;
    }

  }
}
