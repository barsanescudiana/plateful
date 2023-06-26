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

  public getRecipesByIngredients(userId: string): Observable<Recipe[]> {
    return this.http.get(`${this.path}recipes/with-ingredients`, {
      params: {
        userId: userId,
      },
    }) as Observable<Recipe[]>;
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get(`${this.path}recipes/from-db`) as Observable<Recipe[]>;
  }

  public getFavorites(userId: string): Observable<Recipe[]> {
    return this.http.get(`${this.path}recipes/favorites`, {
      params: {
        userId: userId,
        count: 2,
      },
    }) as Observable<Recipe[]>;
  }

  public getPerfectMatch(userId: string): Observable<Recipe[]> {
    return this.http.get(`${this.path}recipes/perfect-match`, {
      params: {
        userId: userId,
        count: 3,
      },
    }) as Observable<Recipe[]>;
  }
}
