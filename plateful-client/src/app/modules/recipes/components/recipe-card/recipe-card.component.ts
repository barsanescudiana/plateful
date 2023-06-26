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
  @Input() recipe: Recipe | any = {
    image: "https://spoonacular.com/recipeImages/552604-312x231.jpg",
    usedIngredients: [
      {
        originalName: "banana, sliced",
        image: "https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg",
        amount: 1,
        unit: "medium",
        unitShort: "medium",
        original: "1 medium banana, sliced",
        meta: ["sliced"],
        name: "banana",
        unitLong: "medium",
        id: 9040,
        aisle: "Produce",
      },
      {
        originalName: "cream cheese, thinly sliced",
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/cream-cheese.jpg",
        amount: 2,
        unit: "ounces",
        unitShort: "oz",
        original: "2 ounces cream cheese, thinly sliced",
        meta: ["thinly sliced"],
        name: "cream cheese",
        unitLong: "ounces",
        id: 1017,
        aisle: "Cheese",
      },
      {
        originalName: "sandwich bread (I used Udi's Gluten Free)",
        image:
          "https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg",
        amount: 2,
        unit: "slices",
        unitShort: "slice",
        original: "2 slices sandwich bread (I used Udi's Gluten Free)",
        extendedName: "gluten free sandwich bread",
        meta: ["gluten free", "(I used Udi's )"],
        name: "sandwich bread",
        unitLong: "slices",
        id: 18069,
        aisle: "Bakery/Bread",
      },
    ],
    missedIngredients: [
      {
        originalName: "creamy Biscoff Spread",
        image: "https://spoonacular.com/cdn/ingredients_100x100/no.jpg",
        amount: 2,
        unit: "Tbs",
        unitShort: "Tbs",
        original: "2 Tbs. creamy Biscoff Spread",
        meta: [],
        name: "creamy biscoff spread",
        unitLong: "Tbs",
        id: 99011,
        aisle: "Nut butters, Jams, and Honey",
      },
      {
        originalName: "honey",
        image: "https://spoonacular.com/cdn/ingredients_100x100/honey.png",
        amount: 2,
        unit: "tsp",
        unitShort: "tsp",
        original: "2 tsp. honey",
        meta: [],
        name: "honey",
        unitLong: "teaspoons",
        id: 19296,
        aisle: "Nut butters, Jams, and Honey",
      },
    ],
    unusedIngredients: [],
    missedIngredientCount: 2,
    id: 552604,
    title: "Biscoff Banana Grilled Cheese",
    imageType: "jpg",
    usedIngredientCount: 3,
    likes: 629,
  };

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);
    this.recipesService.getRecipes().subscribe((data) => {
      data.forEach((object) => {
        console.log(JSON.stringify(object));
      });
    });

    this.imageUrl = this.recipe.image;
  }
}
