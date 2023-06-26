import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  private path = "http://localhost:3000/api/user/";
  private header = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  public getShoppingList(user: User): Observable<
    [
      {
        product: string;
        checked: boolean;
      }
    ]
  > {
    return this.http.get(`${this.path}shopping/get-list`, {
      params: {
        id: user.id,
      },
      headers: this.header,
    }) as Observable<
      [
        {
          product: string;
          checked: boolean;
        }
      ]
    >;
  }

  public updateShoppingList(
    user: User,
    shoppingList: [
      {
        product: string;
        checked: boolean;
      }
    ]
  ): Observable<any> {
    return this.http.patch(`${this.path}edit/shopping-list`, {
      id: user.id,
      shoppingList: shoppingList,
    }) as Observable<any>;
  }
}
