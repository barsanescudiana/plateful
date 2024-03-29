import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "src/app/interfaces/recipe.interface";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  private path = "http://localhost:3000/api/";

  constructor(private http: HttpClient) {}

  public getRecipesByIngredients(
    userId: string,
    product: string
  ): Observable<Recipe[]> {
    return this.http.get(`${this.path}recipes/with-ingredients`, {
      params: {
        userId: userId,
        ingredient: product,
      },
    }) as Observable<Recipe[]>;
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get(`${this.path}recipes/from-db`) as Observable<Recipe[]>;
  }

  public getRecipeById(recipeId: any): Observable<Recipe[]> {
    return this.http.get(`${this.path}recipes/one`, {
      params: {
        recipeId: recipeId,
      },
    }) as Observable<Recipe[]>;
  }

  public getFavorites(): Observable<any> {
    return this.http.get(`${this.path}recipes/favorites`, {
      params: {
        count: 2,
      },
    }) as Observable<any>;
  }

  public getPerfectMatch(): Observable<Recipe[]> {
    return this.http.get(
      `${this.path}recipes/perfect-match`
    ) as Observable<any>;
  }

  public addToFavorites(recipe: any): Observable<any> {
    return this.http.patch(`${this.path}recipes/favorites`, {
      recipeId: recipe.id,
    });
  }
}
